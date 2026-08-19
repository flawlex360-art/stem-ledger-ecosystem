const fs = require('fs');
const { lightSvg, darkSvg } = require('./svg_high_opacity.js');

const rootBlock = `:root {
  --bg: #F7F8FA;
  --surface: #FFFFFF;
  --surface-card: #FFFFFF;
  --surface-subtle: #F1F3F5;
  --surface-hover: #ECEEF1;
  --ink: #111827;
  --ink-soft: #4B5563;
  --ink-muted: #9CA3AF;
  --border: #E5E7EB;
  --border-subtle: #F3F4F6;
  --primary: #4338CA;
  --primary-600: #6366F1;
  --primary-soft: rgba(99,102,241,0.07);
  --primary-glow: rgba(99,102,241,0.15);
  --accent: #4338CA;
  --accent-soft: rgba(99,102,241,0.07);
  --success: #059669;
  --success-soft: rgba(5,150,105,0.08);
  --success-border: rgba(5,150,105,0.15);
  --warning: #D97706;
  --warning-soft: rgba(217,119,6,0.08);
  --warning-border: rgba(217,119,6,0.15);
  --danger: #DC2626;
  --danger-soft: rgba(220,38,38,0.06);
  --danger-border: rgba(220,38,38,0.12);
  --radius-xl: 20px;
  --radius-lg: 16px;
  --radius-md: 12px;
  --radius-sm: 8px;
  --radius-xs: 6px;
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.04);
  --shadow: 0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02);
  --shadow-card: 0 4px 12px -1px rgba(0,0,0,0.06), 0 2px 4px -1px rgba(0,0,0,0.03);
  --shadow-hover: 0 10px 25px -3px rgba(0,0,0,0.08), 0 4px 6px -2px rgba(0,0,0,0.03);
  --font-display: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'JetBrains Mono', 'SF Mono', monospace;
}`;

const bodyBlock = `body {
  font-family: var(--font-body);
  background-color: var(--bg);
  background-image: url("${lightSvg}");
  background-repeat: repeat;
  background-size: 400px 400px;
  color: var(--ink);
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}`;

function processApp(indexPath, isSchoolApp) {
  let content = fs.readFileSync(indexPath, 'utf8');
  
  // 1. Replace the entire :root block
  content = content.replace(/:root\s*\{[^}]+\}/, rootBlock);

  // 2. Replace the body block (handles variations)
  content = content.replace(/body\s*\{[^}]+\}/, bodyBlock);

  // 3. Login HTML updates: Add the dark doodle background to login and splash gradients
  
  // Find loginHTML() and its inline style for background
  // Current: background: linear-gradient(...)
  // We want: background: url(...), linear-gradient(...)
  const loginGradientMatch = content.match(/background:\s*linear-gradient\([^)]+\)/);
  if (loginGradientMatch) {
     const gradientStr = loginGradientMatch[0]; // e.g. background: linear-gradient(135deg, #1E1B4B 0%, #4338CA 60%, #4F46E5 100%)
     const newBackground = `background: url("${darkSvg}"), ${gradientStr.replace('background:', '').trim()}`;
     
     // Let's replace it globally within the return string of loginHTML
     // We will just do a regex replace for the inline style of the outer container
     content = content.replace(/<div[^>]*style="[^"]*background:\s*linear-gradient[^"]*"[^>]*>/, (match) => {
       return match.replace(/background:\s*linear-gradient\([^)]+\)/, newBackground + '; background-blend-mode: overlay; background-size: 400px 400px; background-repeat: repeat');
     });
  }

  // Same for splash screen if they have one
  const splashRegex = /#splashScreen\s*\{([^}]*background:\s*linear-gradient[^}]*)\}/;
  content = content.replace(splashRegex, (match, p1) => {
    return match.replace(/background:\s*linear-gradient\([^)]+\)/, (bgMatch) => {
      return `background: url("${darkSvg}"), ${bgMatch.replace('background:', '').trim()};\n  background-blend-mode: overlay;\n  background-size: 400px 400px;\n  background-repeat: repeat`;
    });
  });

  // If this is the school app, we need to make sure the redesign actually applied fully since the user said it didn't benefit at all.
  // We'll also fix the button colors and other tokens that might have been missed if the previous run failed.
  if (isSchoolApp) {
      // Font import
      content = content.replace(/@import url\('https:\/\/fonts\.googleapis\.com\/css2\?family=Roboto[^']+'\);/, 
        `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@500;600;700&display=swap');`);

      // We might need to manually force the buttons and cards to use the new tokens if it still has old ones.
      // Replace instances of var(--accent) in .btn-primary with var(--primary-600)
      content = content.replace(/\.btn-primary\s*\{[^}]+\}/, `.btn-primary {
  background: var(--primary-600); border-color: var(--primary-600); color: #fff;
  box-shadow: 0 1px 3px rgba(67,56,202,0.3);
}
.btn-primary:hover { background: var(--primary); border-color: var(--primary); }`);

      content = content.replace(/\.bottom-nav-btn\.active\s*\{[^}]+\}/, `.bottom-nav-btn.active { color: var(--primary-600); font-weight: 700; }`);
      content = content.replace(/\.bottom-nav-btn\.active::after\s*\{[^}]+\}/, `.bottom-nav-btn.active::after {
  content: ''; position: absolute; bottom: 4px;
  width: 4px; height: 4px; border-radius: 50%;
  background: var(--primary-600);
}`);

      content = content.replace(/\.stat-card\s*\{[^}]+\}/, `.stat-card {
  background: var(--surface-card);
  border: 1px solid var(--border);
  border-left: 3px solid var(--primary-600);
  border-radius: var(--radius-lg);
  padding: 20px 22px;
  box-shadow: var(--shadow-card);
  display: flex; flex-direction: column; justify-content: space-between;
  position: relative; overflow: hidden;
  transition: all 0.2s ease;
}`);
      
      content = content.replace(/\.fab\s*\{[^}]+\}/, `.fab {
  position: fixed; bottom: 90px; right: 20px;
  width: 54px; height: 54px;
  background: var(--primary-600);
  color: white; border: none; border-radius: 50%;
  font-size: 26px;
  box-shadow: 0 4px 14px rgba(67,56,202,0.35);
  display: flex; align-items: center; justify-content: center;
  z-index: 399; cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}`);
  }

  // General fixes for all apps to make sure Primary tokens are used where Accent was used
  content = content.replace(/var\(--accent\)/g, 'var(--primary)');
  content = content.replace(/var\(--accent-600\)/g, 'var(--primary-600)');
  content = content.replace(/var\(--accent-soft\)/g, 'var(--primary-soft)');

  // Just to be perfectly clean on bottom-nav-btn active dot which might have been generated as primary-600 already
  content = content.replace(/var\(--primary-600-600\)/g, 'var(--primary-600)');
  content = content.replace(/var\(--primary-primary\)/g, 'var(--primary)');

  fs.writeFileSync(indexPath, content);
  console.log(`Processed ${indexPath}`);
}

processApp('./stem_ledger_mobile/www/index.html', true);
processApp('./kpando_stem_community/www/index.html', false);
processApp('./stem_ledger_master_portal/www/index.html', false);

