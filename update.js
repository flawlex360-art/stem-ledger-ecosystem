const fs = require('fs');
const path = 'C:\\\\Users\\\\kpand\\\\.gemini\\\\antigravity\\\\scratch\\\\stem_ledger_master_portal\\\\www\\\\index.html';
let content = fs.readFileSync(path, 'utf8');

// 1. Replace Font Import
content = content.replace(
  /@import url\('https:\/\/fonts.googleapis.com\/css2\?family=Plus\+Jakarta\+Sans:wght@400;500;600;700;800&family=JetBrains\+Mono:wght@500;600;700&display=swap'\);/g,
  `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@500;600;700&display=swap');`
);

// 2. Replace :root block
content = content.replace(
  /:root\s*\{[\s\S]*?--font-mono:[^}]*\}/,
  `:root {
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
}`
);

// 3. Update body block
content = content.replace(
  /body\s*\{[\s\S]*?-webkit-font-smoothing:\s*antialiased;\s*(-moz-osx-font-smoothing:\s*grayscale;\s*)?\}/,
  `body {
  font-family: var(--font-body);
  background-color: var(--bg);
  background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20width%3D'400'%20height%3D'400'%20fill%3D'none'%3E%3Ccircle cx='80' cy='65' r='3.5' fill='%234338CA' opacity='.07'/%3E%3Cellipse cx='80' cy='65' rx='22' ry='9' stroke='%234338CA' stroke-width='.7' opacity='.06' transform='rotate(-35 80 65)'/%3E%3Cellipse cx='80' cy='65' rx='22' ry='9' stroke='%234338CA' stroke-width='.7' opacity='.06' transform='rotate(35 80 65)'/%3E%3Cellipse cx='80' cy='65' rx='22' ry='9' stroke='%234338CA' stroke-width='.7' opacity='.06'/%3E%3Cpath d='M300 75v22l-6 14h28l-6-14V75z' stroke='%234338CA' stroke-width='.7' opacity='.06' stroke-linejoin='round'/%3E%3Cline x1='295' y1='80' x2='317' y2='80' stroke='%234338CA' stroke-width='.5' opacity='.05'/%3E%3Ccircle cx='306' cy='100' r='2' fill='%234338CA' opacity='.04'/%3E%3Ccircle cx='200' cy='200' r='12' stroke='%234338CA' stroke-width='.7' opacity='.06'/%3E%3Ccircle cx='200' cy='200' r='5' stroke='%234338CA' stroke-width='.7' opacity='.06'/%3E%3Cline x1='200' y1='188' x2='200' y2='193' stroke='%234338CA' stroke-width='.7' opacity='.05'/%3E%3Cline x1='200' y1='207' x2='200' y2='212' stroke='%234338CA' stroke-width='.7' opacity='.05'/%3E%3Cline x1='188' y1='200' x2='193' y2='200' stroke='%234338CA' stroke-width='.7' opacity='.05'/%3E%3Cline x1='207' y1='200' x2='212' y2='200' stroke='%234338CA' stroke-width='.7' opacity='.05'/%3E%3Cpath d='M90 320h25v-30h30v30h25' stroke='%234338CA' stroke-width='.7' opacity='.06' stroke-linecap='round' stroke-linejoin='round'/%3E%3Ccircle cx='115' cy='320' r='3' fill='%234338CA' opacity='.05'/%3E%3Ccircle cx='145' cy='290' r='3' fill='%234338CA' opacity='.05'/%3E%3Cpath d='M345 25q14 18-2 36q-16 18 2 36' stroke='%234338CA' stroke-width='.7' opacity='.05'/%3E%3Cpath d='M358 25q-14 18 2 36q16 18-2 36' stroke='%234338CA' stroke-width='.7' opacity='.05'/%3E%3Cline x1='343' y1='43' x2='360' y2='43' stroke='%234338CA' stroke-width='.5' opacity='.04'/%3E%3Cline x1='343' y1='61' x2='360' y2='61' stroke='%234338CA' stroke-width='.5' opacity='.04'/%3E%3Cline x1='343' y1='79' x2='360' y2='79' stroke='%234338CA' stroke-width='.5' opacity='.04'/%3E%3Cpath d='M50 180h16l-12 14 12 14h-16' stroke='%234338CA' stroke-width='.9' opacity='.06' stroke-linejoin='round' stroke-linecap='round'/%3E%3Cpath d='M352 245h-18M340 245v18M348 245v16' stroke='%234338CA' stroke-width='.8' opacity='.05' stroke-linecap='round'/%3E%3Cpath d='M55 345l5 5 10-20h12' stroke='%234338CA' stroke-width='.8' opacity='.05' stroke-linejoin='round' stroke-linecap='round'/%3E%3Ctext x='250' y='365' font-family='monospace' font-size='9' fill='%234338CA' opacity='.05'%3E01101%3C/text%3E%3Ccircle cx='370' cy='165' r='4' fill='%234338CA' opacity='.05'/%3E%3Ccircle cx='386' cy='152' r='3' fill='%234338CA' opacity='.04'/%3E%3Cline x1='374' y1='162' x2='384' y2='154' stroke='%234338CA' stroke-width='.7' opacity='.05'/%3E%3Ccircle cx='356' cy='153' r='2.5' fill='%234338CA' opacity='.04'/%3E%3Cline x1='367' y1='163' x2='358' y2='155' stroke='%234338CA' stroke-width='.7' opacity='.05'/%3E%3Cpath d='M180 55v14M173 62h14' stroke='%234338CA' stroke-width='.8' opacity='.05' stroke-linecap='round'/%3E%3Cpath d='M255 148c6-10 18-10 18 0s-12 10-18 0c-6-10-18-10-18 0s12 10 18 0' stroke='%234338CA' stroke-width='.7' opacity='.05'/%3E%3Ccircle cx='160' cy='345' r='2' fill='%234338CA' opacity='.04'/%3E%3Ccircle cx='170' cy='338' r='1.5' fill='%234338CA' opacity='.04'/%3E%3Ccircle cx='152' cy='352' r='1.5' fill='%234338CA' opacity='.04'/%3E%3Cpath d='M280 200l12 20h-24z' stroke='%234338CA' stroke-width='.7' opacity='.05' stroke-linejoin='round'/%3E%3Cpath d='M20 260h8l4-6 8 12 8-12 8 12 4-6h8' stroke='%234338CA' stroke-width='.6' opacity='.05' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 400px 400px;
  color: var(--ink);
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}`
);

// 4. Update Bottom Navigation
content = content.replace(/\.bottom-nav\s*\{[^}]*\}/g, '');
content = content.replace(/\.bottom-nav-btn\s*\{[^}]*\}/g, '');
content = content.replace(/\.bottom-nav-btn\.active\s*\{[^}]*\}/g, '');
content = content.replace(/\.bottom-nav-btn\s*svg\s*\{[^}]*\}/g, '');

content = content.replace(/@media \((.*?)\) \{/, `@media ($1) {
  .bottom-nav {
    position: fixed; bottom: 0; left: 0; right: 0;
    height: 68px;
    background: rgba(255,255,255,0.88);
    backdrop-filter: saturate(180%) blur(20px);
    -webkit-backdrop-filter: saturate(180%) blur(20px);
    border-top: 0.5px solid rgba(0,0,0,0.08);
    box-shadow: 0 -1px 0 rgba(0,0,0,0.03);
    display: flex;
    z-index: 400;
    justify-content: space-around;
    align-items: center;
    padding: 0 4px;
    padding-bottom: env(safe-area-inset-bottom, 0);
  }
  .bottom-nav-btn {
    background: none; border: none;
    font-size: 10px; font-weight: 600; color: var(--ink-muted);
    display: flex; flex-direction: column; align-items: center; gap: 3px;
    padding: 8px 12px; border-radius: 12px;
    position: relative; cursor: pointer;
    transition: color 0.2s ease;
    letter-spacing: 0.01em;
  }
  .bottom-nav-btn svg { width: 22px; height: 22px; fill: currentColor; }
  .bottom-nav-btn.active { color: var(--primary-600); font-weight: 700; }
  .bottom-nav-btn.active::after {
    content: ''; position: absolute; bottom: 4px;
    width: 4px; height: 4px; border-radius: 50%;
    background: var(--primary-600);
  }
`);

// 5. Update .stat-card-modern
content = content.replace(
  /\.stat-card-modern\s*\{[\s\S]*?transition:[^}]*\}/,
  `.stat-card-modern {
  background: var(--surface-card);
  border: 1px solid var(--border);
  border-left: 3px solid var(--primary-600);
  border-radius: var(--radius-lg);
  padding: 20px 22px;
  box-shadow: var(--shadow-card);
  display: flex; flex-direction: column; justify-content: space-between;
  position: relative; overflow: hidden;
  transition: all 0.2s ease;
}`
);
content = content.replace(
  /\.stat-card-modern:hover\s*\{[\s\S]*?box-shadow:[^}]*\}/,
  `.stat-card-modern:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-hover);
}`
);

// 6. Update glass overlay + modal
content = content.replace(
  /\.glass-overlay\s*\{[\s\S]*?transition: opacity[^}]*\}/,
  `.glass-overlay {
  position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.35);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: flex; justify-content: center; align-items: center;
  z-index: 9999; padding: 20px;
  opacity: 0; pointer-events: none;
  transition: opacity 0.25s ease;
}`
);
content = content.replace(
  /\.glass-modal\s*\{[\s\S]*?transition: transform[^}]*\}/,
  `.glass-modal {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-hover);
  width: 100%; max-width: 700px; max-height: 85vh;
  overflow-y: auto; padding: 24px 28px;
  transform: scale(0.95) translateY(10px);
  transition: transform 0.3s cubic-bezier(0.32, 0.72, 0, 1);
}`
);
content = content.replace(
  /\.glass-overlay:not\(\[hidden\]\)\s*\.glass-modal\s*\{[^}]*\}/,
  `.glass-overlay:not([hidden]) .glass-modal { transform: scale(1) translateY(0); }`
);

// 7. Update buttons
content = content.replace(
  /\.btn\s*\{[\s\S]*?transition:[^}]*\}/,
  `.btn {
  font-family: var(--font-body); font-size: 13px; font-weight: 600;
  padding: 10px 16px; border-radius: var(--radius-sm);
  border: 1px solid var(--border); background: var(--surface);
  color: var(--ink); cursor: pointer;
  display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  transition: all 0.15s ease; letter-spacing: 0.01em;
}`
);
content = content.replace(/\.btn:hover\s*\{[^}]*\}/, `.btn:hover { background: var(--surface-subtle); }`);
content = content.replace(
  /\.btn-primary\s*\{[^}]*\}/,
  `.btn-primary {
  background: var(--primary-600); border-color: var(--primary-600); color: #fff;
  box-shadow: 0 1px 3px rgba(67,56,202,0.3);
}`
);
content = content.replace(/\.btn-primary:hover\s*\{[^}]*\}/, `.btn-primary:hover { background: var(--primary); border-color: var(--primary); }`);

// 8. Update Splash Screen
content = content.replace(
  /#splashScreen\s*\{[^}]*\}/,
  `#splashScreen {
  position: fixed; inset: 0; z-index: 99999;
  display: flex; justify-content: center; align-items: center;
  background: linear-gradient(135deg, #1E1B4B 0%, #4338CA 50%, #4F46E5 100%);
  transition: opacity 0.5s ease;
}`
);
content = content.replace(
  /\.splash-title\s*\{[^}]*\}/,
  `.splash-title { font-size: 32px; font-weight: 900; letter-spacing: -0.03em; margin-bottom: 15px; font-family: var(--font-display); color: #ffffff; text-shadow: 0 2px 4px rgba(0,0,0,0.2); }`
);

// 9. Update page entrance animation
content = content.replace(
  /\.page-fade-in\s*\{[^}]*\}/,
  `.page-fade-in {
  animation: premiumEntrance 0.45s cubic-bezier(0.32, 0.72, 0, 1) forwards;
}`
);
content = content.replace(
  /@keyframes premiumEntrance\s*\{[\s\S]*?\}/,
  `@keyframes premiumEntrance {
  0% { opacity: 0; transform: translateY(16px); }
  100% { opacity: 1; transform: translateY(0); }
}`
);

// 10. Update loginHTML() background
content = content.replace(
  /background:\s*url\('login_bg\.jpg'\)\s*no-repeat\s*center\s*center\/cover/,
  `background: linear-gradient(135deg, #1E1B4B 0%, #4338CA 60%, #4F46E5 100%)`
);
content = content.replace(
  /<!-- Backdrop overlay to darken\/soften the image slightly -->[\s\S]*?<div style=\"position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba\(15, 23, 42, 0\.45\); z-index: 1;\"><\/div>/,
  ``
);
content = content.replace(
  /color:\s*#1c2d5e;/g,
  `color: #4338CA;`
);

// 11. Update .convo-header
content = content.replace(
  /\.convo-header\s*\{[^}]*\}/,
  `.convo-header {
  display: flex; align-items: center; gap: 12px;
  padding: 14px 16px;
  background: var(--primary);
  color: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}`
);

// 12. Update .convo-overlay transition
content = content.replace(
  /\.convo-overlay\s*\{[^}]*\}/,
  `.convo-overlay {
  position: fixed; top: 0; left: 0; right: 0; bottom: 80px;
  z-index: 300; background: var(--bg);
  display: flex; flex-direction: column;
  transform: translateX(100%);
  transition: transform 0.28s cubic-bezier(0.32, 0.72, 0, 1), visibility 0s 0.28s;
  visibility: hidden; overflow: hidden;
}`
);
content = content.replace(
  /\.convo-overlay\.open\s*\{[^}]*\}/,
  `.convo-overlay.open {
  transform: translateX(0); visibility: visible;
  transition: transform 0.28s cubic-bezier(0.32, 0.72, 0, 1), visibility 0s 0s;
}`
);

// 13. Update toast, nm-overlay, chat components
content = content.replace(
  /\.toast-notification\s*\{([^}]*)\}/,
  (match, p1) => {
    let replaced = p1.replace(/border-radius:[^;]+;/, 'border-radius: 16px;');
    replaced = replaced.replace(/box-shadow:[^;]+;/, 'box-shadow: var(--shadow-hover);');
    return '.toast-notification {' + replaced + '}';
  }
);
content = content.replace(
  /\.nm-overlay\s*\{([^}]*)\}/,
  (match, p1) => {
    return '.nm-overlay {' + p1 + ' backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); }';
  }
);
content = content.replace(
  /\.chat-input-area\s*\{([^}]*)\}/,
  (match, p1) => {
    let replaced = p1.replace(/border-top:[^;]+;/, 'border-top: 0.5px solid rgba(0,0,0,0.08);');
    return '.chat-input-area {' + replaced + '}';
  }
);
content = content.replace(
  /\.chat-input\s*\{([^}]*)\}/,
  (match, p1) => {
    let replaced = p1.replace(/border-radius:[^;]+;/, 'border-radius: 9999px;');
    return '.chat-input {' + replaced + '}';
  }
);
content = content.replace(
  /\.chat-send-btn\s*\{([^}]*)\}/,
  (match, p1) => {
    let replaced = p1.replace(/background:[^;]+;/, 'background: var(--primary-600);');
    if (!replaced.includes('box-shadow')) {
      replaced += ' box-shadow: var(--shadow);';
    }
    return '.chat-send-btn {' + replaced + '}';
  }
);
// Focus ring on chat-input
if (!content.includes('.chat-input:focus')) {
  content = content.replace('.chat-send-btn {', '.chat-input:focus { border-color: var(--primary-600); box-shadow: 0 0 0 3px var(--primary-soft); }\\n.chat-send-btn {');
}

fs.writeFileSync(path, content, 'utf8');
console.log('Update script completed.');
