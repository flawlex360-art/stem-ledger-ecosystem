const fs = require('fs');
const file = 'C:/Users/kpand/.gemini/antigravity/scratch/stem_ledger_mobile/www/index.html';
let content = fs.readFileSync(file, 'utf8');

const replacements = [
  {
    find: /@import url\('https:\/\/fonts\.googleapis\.com\/css2\?family=Roboto:wght@400;500;700&display=swap'\);/,
    replace: `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@500;600;700&display=swap');`
  },
  {
    find: /:root\s*\{[^}]+\}/,
    replace: `:root {
  --bg: #F7F8FA;
  --surface: #FFFFFF;
  --surface-2: #F1F3F5;
  --surface-hover: #ECEEF1;
  --ink: #111827;
  --ink-soft: #4B5563;
  --ink-muted: #9CA3AF;
  --border: #E5E7EB;
  --border-subtle: #F3F4F6;
  --accent: #1B2B5E;
  --accent-600: #2563EB;
  --accent-soft: rgba(37,99,235,0.07);
  --danger: #DC2626;
  --danger-soft: rgba(220,38,38,0.06);
  --science: #2D6A4F;
  --it: #0891B2;
  --math: #C2410C;
  --engineering: #7C3AED;
  --radius: 12px;
  --radius-sm: 8px;
  --radius-xs: 6px;
  --radius-full: 9999px;
  --shadow: 0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02);
  --shadow-md: 0 4px 12px -1px rgba(0,0,0,0.06), 0 2px 4px -1px rgba(0,0,0,0.03);
  --shadow-lg: 0 10px 25px -3px rgba(0,0,0,0.08), 0 4px 6px -2px rgba(0,0,0,0.03);
  --font-display: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'JetBrains Mono', 'SF Mono', monospace;
}`
  },
  {
    find: /body\s*\{[^}]+\}/,
    replace: `body {
  font-family: var(--font-body);
  background-color: var(--bg);
  background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20width%3D'400'%20height%3D'400'%20fill%3D'none'%3E%3Ccircle cx='80' cy='65' r='3.5' fill='%231B2B5E' opacity='.07'/%3E%3Cellipse cx='80' cy='65' rx='22' ry='9' stroke='%231B2B5E' stroke-width='.7' opacity='.06' transform='rotate(-35 80 65)'/%3E%3Cellipse cx='80' cy='65' rx='22' ry='9' stroke='%231B2B5E' stroke-width='.7' opacity='.06' transform='rotate(35 80 65)'/%3E%3Cellipse cx='80' cy='65' rx='22' ry='9' stroke='%231B2B5E' stroke-width='.7' opacity='.06'/%3E%3Cpath d='M300 75v22l-6 14h28l-6-14V75z' stroke='%231B2B5E' stroke-width='.7' opacity='.06' stroke-linejoin='round'/%3E%3Cline x1='295' y1='80' x2='317' y2='80' stroke='%231B2B5E' stroke-width='.5' opacity='.05'/%3E%3Ccircle cx='306' cy='100' r='2' fill='%231B2B5E' opacity='.04'/%3E%3Ccircle cx='200' cy='200' r='12' stroke='%231B2B5E' stroke-width='.7' opacity='.06'/%3E%3Ccircle cx='200' cy='200' r='5' stroke='%231B2B5E' stroke-width='.7' opacity='.06'/%3E%3Cline x1='200' y1='188' x2='200' y2='193' stroke='%231B2B5E' stroke-width='.7' opacity='.05'/%3E%3Cline x1='200' y1='207' x2='200' y2='212' stroke='%231B2B5E' stroke-width='.7' opacity='.05'/%3E%3Cline x1='188' y1='200' x2='193' y2='200' stroke='%231B2B5E' stroke-width='.7' opacity='.05'/%3E%3Cline x1='207' y1='200' x2='212' y2='200' stroke='%231B2B5E' stroke-width='.7' opacity='.05'/%3E%3Cpath d='M90 320h25v-30h30v30h25' stroke='%231B2B5E' stroke-width='.7' opacity='.06' stroke-linecap='round' stroke-linejoin='round'/%3E%3Ccircle cx='115' cy='320' r='3' fill='%231B2B5E' opacity='.05'/%3E%3Ccircle cx='145' cy='290' r='3' fill='%231B2B5E' opacity='.05'/%3E%3Cpath d='M345 25q14 18-2 36q-16 18 2 36' stroke='%231B2B5E' stroke-width='.7' opacity='.05'/%3E%3Cpath d='M358 25q-14 18 2 36q16 18-2 36' stroke='%231B2B5E' stroke-width='.7' opacity='.05'/%3E%3Cline x1='343' y1='43' x2='360' y2='43' stroke='%231B2B5E' stroke-width='.5' opacity='.04'/%3E%3Cline x1='343' y1='61' x2='360' y2='61' stroke='%231B2B5E' stroke-width='.5' opacity='.04'/%3E%3Cline x1='343' y1='79' x2='360' y2='79' stroke='%231B2B5E' stroke-width='.5' opacity='.04'/%3E%3Cpath d='M50 180h16l-12 14 12 14h-16' stroke='%231B2B5E' stroke-width='.9' opacity='.06' stroke-linejoin='round' stroke-linecap='round'/%3E%3Cpath d='M352 245h-18M340 245v18M348 245v16' stroke='%231B2B5E' stroke-width='.8' opacity='.05' stroke-linecap='round'/%3E%3Cpath d='M55 345l5 5 10-20h12' stroke='%231B2B5E' stroke-width='.8' opacity='.05' stroke-linejoin='round' stroke-linecap='round'/%3E%3Ctext x='250' y='365' font-family='monospace' font-size='9' fill='%231B2B5E' opacity='.05'%3E01101%3C/text%3E%3Ccircle cx='370' cy='165' r='4' fill='%231B2B5E' opacity='.05'/%3E%3Ccircle cx='386' cy='152' r='3' fill='%231B2B5E' opacity='.04'/%3E%3Cline x1='374' y1='162' x2='384' y2='154' stroke='%231B2B5E' stroke-width='.7' opacity='.05'/%3E%3Ccircle cx='356' cy='153' r='2.5' fill='%231B2B5E' opacity='.04'/%3E%3Cline x1='367' y1='163' x2='358' y2='155' stroke='%231B2B5E' stroke-width='.7' opacity='.05'/%3E%3Cpath d='M180 55v14M173 62h14' stroke='%231B2B5E' stroke-width='.8' opacity='.05' stroke-linecap='round'/%3E%3Cpath d='M255 148c6-10 18-10 18 0s-12 10-18 0c-6-10-18-10-18 0s12 10 18 0' stroke='%231B2B5E' stroke-width='.7' opacity='.05'/%3E%3Ccircle cx='160' cy='345' r='2' fill='%231B2B5E' opacity='.04'/%3E%3Ccircle cx='170' cy='338' r='1.5' fill='%231B2B5E' opacity='.04'/%3E%3Ccircle cx='152' cy='352' r='1.5' fill='%231B2B5E' opacity='.04'/%3E%3Cpath d='M280 200l12 20h-24z' stroke='%231B2B5E' stroke-width='.7' opacity='.05' stroke-linejoin='round'/%3E%3Cpath d='M20 260h8l4-6 8 12 8-12 8 12 4-6h8' stroke='%231B2B5E' stroke-width='.6' opacity='.05' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
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
  },
  {
    find: /\.bottom-nav\s*\{[^}]+\}/,
    replace: `.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 68px;
  background: rgba(255,255,255,0.88);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-top: 0.5px solid rgba(0,0,0,0.08);
  box-shadow: 0 -1px 0 rgba(0,0,0,0.03);
  display: none;
  z-index: 400;
  justify-content: space-around;
  align-items: center;
  padding: 0 4px;
  padding-bottom: env(safe-area-inset-bottom, 0);
}`
  },
  {
    find: /\.bottom-nav-btn\s*\{[^}]+\}/,
    replace: `.bottom-nav-btn {
  background: none;
  border: none;
  font-size: 10px;
  font-weight: 600;
  color: var(--ink-muted);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  padding: 8px 12px;
  border-radius: 12px;
  position: relative;
  cursor: pointer;
  transition: color 0.2s ease;
  letter-spacing: 0.01em;
}`
  },
  {
    find: /\.bottom-nav-btn\.active\s*\{[^}]+\}/,
    replace: `.bottom-nav-btn.active { color: var(--accent); font-weight: 700; }
.bottom-nav-btn.active::after {
  content: '';
  position: absolute;
  bottom: 4px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--accent);
}`
  },
  {
    find: /\.stat-card\s*\{[^}]+\}/,
    replace: `.stat-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  background: var(--surface);
  border: 1px solid var(--border);
  border-left: 3px solid var(--accent);
  border-radius: var(--radius);
  padding: 18px 20px;
  box-shadow: var(--shadow);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}`
  },
  {
    find: /\.stat-card:hover\s*\{[^}]+\}/,
    replace: `.stat-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}`
  },
  {
    find: /\.stat-card\.clickable\s*\{[^}]+\}/,
    replace: `.stat-card.clickable { cursor: pointer; }`
  },
  {
    find: /\.glass-overlay\s*\{[^}]+\}\s*\.glass-overlay:not\(\[hidden\]\)\s*\{[^}]+\}\s*\.glass-modal\s*\{[^}]+\}\s*\.glass-overlay:not\(\[hidden\]\)\s*\.glass-modal\s*\{[^}]+\}/,
    replace: `.glass-overlay {
  position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.35);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: flex; justify-content: center; align-items: center;
  z-index: 9999; padding: 20px;
  opacity: 0; pointer-events: none;
  transition: opacity 0.25s ease;
}
.glass-overlay:not([hidden]) { opacity: 1; pointer-events: auto; }
.glass-modal {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  box-shadow: var(--shadow-lg);
  width: 100%; max-width: 500px; max-height: 85vh;
  overflow-y: auto; padding: 24px;
  transform: scale(0.95) translateY(10px);
  transition: transform 0.3s cubic-bezier(0.32, 0.72, 0, 1);
}
.glass-overlay:not([hidden]) .glass-modal { transform: scale(1) translateY(0); }`
  },
  {
    find: /\.modal-overlay\s*\{[^}]+\}\s*\.modal-overlay\[hidden\]\s*\{[^}]+\}\s*\.modal\s*\{[^}]+\}/,
    replace: `.modal-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.35);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: flex; align-items: center; justify-content: center;
  padding: 20px; z-index: 500;
}
.modal-overlay[hidden] { display: none; }
.modal {
  background: var(--surface);
  border-radius: 20px;
  width: 100%; max-width: 660px; max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--shadow-lg);
}`
  },
  {
    find: /\.btn\s*\{[^}]+\}\s*\.btn:hover\s*\{[^}]+\}\s*\.btn-primary\s*\{[^}]+\}\s*\.btn-primary:hover\s*\{[^}]+\}/,
    replace: `.btn {
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 600;
  padding: 10px 16px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--ink);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.15s ease;
  letter-spacing: 0.01em;
}
.btn:hover { background: var(--surface-2); }
.btn-primary {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
  box-shadow: 0 1px 3px rgba(27,43,94,0.3);
}
.btn-primary:hover {
  background: #162450;
  border-color: #162450;
}`
  },
  {
    find: /\.fab\s*\{[^}]+\}\s*\.fab:active\s*\{[^}]+\}/,
    replace: `.fab {
  position: fixed; bottom: 90px; right: 20px;
  width: 54px; height: 54px;
  background: var(--accent);
  color: white; border: none; border-radius: 50%;
  font-size: 26px;
  box-shadow: 0 4px 14px rgba(27,43,94,0.35);
  display: flex; align-items: center; justify-content: center;
  z-index: 399; cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.fab:active { transform: scale(0.92); }`
  },
  {
    find: /\.compact-list-item\s*\{[^}]+\}\s*\.compact-list-item:active\s*\{[^}]+\}\s*\.compact-list-item:hover\s*\{[^}]+\}/,
    replace: `.compact-list-item {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 14px 16px;
  cursor: pointer;
  transition: background 0.15s ease, transform 0.1s ease, box-shadow 0.15s ease;
  border-left-width: 3px;
  border-left-style: solid;
  box-shadow: var(--shadow);
}
.compact-list-item:active {
  background: var(--surface-2);
  transform: scale(0.99);
}
.compact-list-item:hover {
  box-shadow: var(--shadow-md);
}`
  },
  {
    find: /#splashScreen\s*\{[^}]+\}/,
    replace: `#splashScreen {
  position: fixed; inset: 0; z-index: 99999;
  display: flex; justify-content: center; align-items: center;
  background: linear-gradient(135deg, #0F172A 0%, #1B2B5E 50%, #1E3A5F 100%);
  background-size: cover;
  transition: opacity 0.5s ease;
}`
  },
  {
    find: /\.splash-card\s*\{[^}]+\}\s*\.splash-title\s*\{[^}]+\}\s*\.splash-progress-bar\s*\{[^}]+\}\s*\.splash-progress-fill\s*\{[^}]+\}\s*\.splash-footer\s*\{[^}]+\}/,
    replace: `.splash-card {
  text-align: center;
  color: #fff;
  padding: 40px;
}
.splash-title {
  font-family: var(--font-display);
  font-size: 32px;
  font-weight: 900;
  letter-spacing: -0.03em;
  margin-bottom: 24px;
  text-shadow: 0 2px 8px rgba(0,0,0,0.3);
}
.splash-progress-bar {
  width: 180px;
  height: 3px;
  background: rgba(255,255,255,0.15);
  border-radius: 4px;
  margin: 0 auto 20px;
  overflow: hidden;
}
.splash-progress-fill {
  height: 100%;
  background: rgba(255,255,255,0.9);
  border-radius: 4px;
  transition: width 0.3s ease;
}
.splash-footer {
  font-size: 11px;
  color: rgba(255,255,255,0.5);
  font-weight: 500;
  letter-spacing: 0.03em;
}`
  },
  {
    find: /background:\s*url\('login_bg\.jpg'\)\s*no-repeat\s*center\s*center\/cover;/,
    replace: `background: linear-gradient(135deg, #0F172A 0%, #1B2B5E 60%, #1E3A5F 100%);`
  },
  {
    find: /<!--\s*Backdrop overlay to darken\/soften the image slightly\s*-->\s*<div[^>]*?background:\s*rgba\(15,\s*23,\s*42,\s*0\.45\)[^>]*?><\/div>/,
    replace: ``
  },
  {
    find: /\.convo-overlay\s*\{[^}]+\}\s*\.convo-overlay\.open\s*\{[^}]+\}/,
    replace: `.convo-overlay {
  position: fixed; top: 0; left: 0; right: 0; bottom: 80px;
  z-index: 300;
  background: var(--bg);
  display: flex; flex-direction: column;
  transform: translateX(100%);
  transition: transform 0.28s cubic-bezier(0.32, 0.72, 0, 1), visibility 0s 0.28s;
  visibility: hidden;
  overflow: hidden;
}
.convo-overlay.open {
  transform: translateX(0); visibility: visible;
  transition: transform 0.28s cubic-bezier(0.32, 0.72, 0, 1), visibility 0s 0s;
}`
  },
  {
    find: /\.convo-header\s*\{[^}]+\}/,
    replace: `.convo-header {
  display: flex; align-items: center; gap: 12px;
  padding: 14px 16px;
  background: var(--accent);
  color: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}`
  },
  {
    find: /\.page-fade-in\s*\{[^}]+\}\s*@keyframes\s*premiumEntrance\s*\{[^}]+\}/,
    replace: `.page-fade-in {
  animation: premiumEntrance 0.5s cubic-bezier(0.32, 0.72, 0, 1) forwards;
  will-change: transform, opacity;
}
@keyframes premiumEntrance {
  0% { opacity: 0; transform: translateY(16px); }
  100% { opacity: 1; transform: translateY(0); }
}`
  },
  {
    find: /\.toast-notification\s*\{[^}]+\}\s*\.toast-notification\.show\s*\{[^}]+\}/,
    replace: `.toast-notification {
  position: fixed; top: -100px; left: 50%;
  transform: translate3d(-50%, 0, 0);
  width: calc(100% - 32px); max-width: 380px;
  background: var(--surface);
  color: var(--ink);
  padding: 14px 18px;
  border-radius: 16px;
  box-shadow: var(--shadow-lg);
  display: flex; align-items: center; gap: 12px;
  z-index: 10000;
  transition: top 0.4s cubic-bezier(0.32, 0.72, 0, 1);
  cursor: pointer;
  border: 1px solid var(--border);
  font-size: 13px;
}
.toast-notification.show { top: 20px; }`
  },
  {
    find: /\.nm-overlay\s*\{[^}]+\}\s*\.nm-overlay\.show\s*\{[^}]+\}\s*\.nm-sheet\s*\{[^}]+\}\s*\.nm-overlay\.show\s*\.nm-sheet\s*\{[^}]+\}/,
    replace: `.nm-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.35);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 500; opacity: 0; pointer-events: none;
  transition: opacity 0.25s;
  display: flex; align-items: flex-end;
}
.nm-overlay.show { opacity: 1; pointer-events: auto; }
.nm-sheet {
  background: var(--surface);
  width: 100%; max-height: 75vh;
  border-radius: 20px 20px 0 0;
  padding: 0;
  transform: translateY(100%);
  transition: transform 0.3s cubic-bezier(0.32, 0.72, 0, 1);
  display: flex; flex-direction: column;
}
.nm-overlay.show .nm-sheet { transform: translateY(0); }`
  },
  {
    find: /\.chat-input-area\s*\{[^}]+\}\s*\.chat-input\s*\{[^}]+\}\s*\.chat-input:focus\s*\{[^}]+\}/,
    replace: `.chat-input-area {
  padding: 10px 14px;
  background: var(--surface);
  border-top: 0.5px solid rgba(0,0,0,0.06);
  display: flex; gap: 10px; align-items: center;
  flex-shrink: 0;
}
.chat-input {
  flex: 1;
  background: var(--surface-2);
  border: none;
  padding: 10px 16px;
  border-radius: var(--radius-full);
  outline: none;
  font-size: 14px;
  font-family: var(--font-body);
  color: var(--ink);
}
.chat-input:focus {
  box-shadow: 0 0 0 2px var(--accent-soft);
}`
  },
  {
    find: /\.chat-send-btn\s*\{[^}]+\}\s*\.chat-send-btn:active\s*\{[^}]+\}\s*\.chat-send-btn\s*svg\s*\{[^}]+\}/,
    replace: `.chat-send-btn {
  background: var(--accent);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px; height: 40px;
  flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  transition: transform 0.1s ease, background 0.15s ease;
  box-shadow: 0 2px 6px rgba(27,43,94,0.3);
}
.chat-send-btn:active { transform: scale(0.9); }
.chat-send-btn svg { width: 18px; height: 18px; fill: currentColor; }`
  }
];

let successCount = 0;
replacements.forEach((r, i) => {
  if (r.find.test(content)) {
    content = content.replace(r.find, r.replace);
    successCount++;
  } else {
    console.log('Failed to find match for replacement index ' + i);
    console.log('Regex:', r.find);
  }
});

fs.writeFileSync(file, content, 'utf8');
console.log('Successfully applied ' + successCount + ' out of ' + replacements.length + ' replacements.');
