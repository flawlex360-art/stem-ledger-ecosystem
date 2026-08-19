const fs = require('fs');
const path = 'C:\\Users\\kpand\\.gemini\\antigravity\\scratch\\kpando_stem_community\\www\\index.html';

let content = fs.readFileSync(path, 'utf8');

// 1. Replace Font Import
content = content.replace(
  /@import url\('https:\/\/fonts\.googleapis\.com\/css2\?family=Roboto:wght@400;500;700&display=swap'\);/,
  `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@500;600;700&display=swap');`
);

// 2. Replace :root block
content = content.replace(/:root\s*\{[\s\S]*?\}/, `:root {
  --bg: #F7F8FA;
  --surface: #FFFFFF;
  --surface-2: #F1F3F5;
  --surface-hover: #ECEEF1;
  --ink: #111827;
  --ink-soft: #4B5563;
  --ink-muted: #9CA3AF;
  --border: #E5E7EB;
  --border-subtle: #F3F4F6;
  --accent: #0D7C66;
  --accent-600: #10B981;
  --accent-soft: rgba(16,185,129,0.07);
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
}`);

// 3. Update body CSS rule
let bodyNew = `body {
  font-family: var(--font-body);
  background-color: var(--bg);
  background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20width%3D'400'%20height%3D'400'%20fill%3D'none'%3E%3Ccircle cx='80' cy='65' r='3.5' fill='%230D7C66' opacity='.07'/%3E%3Cellipse cx='80' cy='65' rx='22' ry='9' stroke='%230D7C66' stroke-width='.7' opacity='.06' transform='rotate(-35 80 65)'/%3E%3Cellipse cx='80' cy='65' rx='22' ry='9' stroke='%230D7C66' stroke-width='.7' opacity='.06' transform='rotate(35 80 65)'/%3E%3Cellipse cx='80' cy='65' rx='22' ry='9' stroke='%230D7C66' stroke-width='.7' opacity='.06'/%3E%3Cpath d='M300 75v22l-6 14h28l-6-14V75z' stroke='%230D7C66' stroke-width='.7' opacity='.06' stroke-linejoin='round'/%3E%3Cline x1='295' y1='80' x2='317' y2='80' stroke='%230D7C66' stroke-width='.5' opacity='.05'/%3E%3Ccircle cx='306' cy='100' r='2' fill='%230D7C66' opacity='.04'/%3E%3Ccircle cx='200' cy='200' r='12' stroke='%230D7C66' stroke-width='.7' opacity='.06'/%3E%3Ccircle cx='200' cy='200' r='5' stroke='%230D7C66' stroke-width='.7' opacity='.06'/%3E%3Cline x1='200' y1='188' x2='200' y2='193' stroke='%230D7C66' stroke-width='.7' opacity='.05'/%3E%3Cline x1='200' y1='207' x2='200' y2='212' stroke='%230D7C66' stroke-width='.7' opacity='.05'/%3E%3Cline x1='188' y1='200' x2='193' y2='200' stroke='%230D7C66' stroke-width='.7' opacity='.05'/%3E%3Cline x1='207' y1='200' x2='212' y2='200' stroke='%230D7C66' stroke-width='.7' opacity='.05'/%3E%3Cpath d='M90 320h25v-30h30v30h25' stroke='%230D7C66' stroke-width='.7' opacity='.06' stroke-linecap='round' stroke-linejoin='round'/%3E%3Ccircle cx='115' cy='320' r='3' fill='%230D7C66' opacity='.05'/%3E%3Ccircle cx='145' cy='290' r='3' fill='%230D7C66' opacity='.05'/%3E%3Cpath d='M345 25q14 18-2 36q-16 18 2 36' stroke='%230D7C66' stroke-width='.7' opacity='.05'/%3E%3Cpath d='M358 25q-14 18 2 36q16 18-2 36' stroke='%230D7C66' stroke-width='.7' opacity='.05'/%3E%3Cline x1='343' y1='43' x2='360' y2='43' stroke='%230D7C66' stroke-width='.5' opacity='.04'/%3E%3Cline x1='343' y1='61' x2='360' y2='61' stroke='%230D7C66' stroke-width='.5' opacity='.04'/%3E%3Cline x1='343' y1='79' x2='360' y2='79' stroke='%230D7C66' stroke-width='.5' opacity='.04'/%3E%3Cpath d='M50 180h16l-12 14 12 14h-16' stroke='%230D7C66' stroke-width='.9' opacity='.06' stroke-linejoin='round' stroke-linecap='round'/%3E%3Cpath d='M352 245h-18M340 245v18M348 245v16' stroke='%230D7C66' stroke-width='.8' opacity='.05' stroke-linecap='round'/%3E%3Cpath d='M55 345l5 5 10-20h12' stroke='%230D7C66' stroke-width='.8' opacity='.05' stroke-linejoin='round' stroke-linecap='round'/%3E%3Ctext x='250' y='365' font-family='monospace' font-size='9' fill='%230D7C66' opacity='.05'%3E01101%3C/text%3E%3Ccircle cx='370' cy='165' r='4' fill='%230D7C66' opacity='.05'/%3E%3Ccircle cx='386' cy='152' r='3' fill='%230D7C66' opacity='.04'/%3E%3Cline x1='374' y1='162' x2='384' y2='154' stroke='%230D7C66' stroke-width='.7' opacity='.05'/%3E%3Ccircle cx='356' cy='153' r='2.5' fill='%230D7C66' opacity='.04'/%3E%3Cline x1='367' y1='163' x2='358' y2='155' stroke='%230D7C66' stroke-width='.7' opacity='.05'/%3E%3Cpath d='M180 55v14M173 62h14' stroke='%230D7C66' stroke-width='.8' opacity='.05' stroke-linecap='round'/%3E%3Cpath d='M255 148c6-10 18-10 18 0s-12 10-18 0c-6-10-18-10-18 0s12 10 18 0' stroke='%230D7C66' stroke-width='.7' opacity='.05'/%3E%3Ccircle cx='160' cy='345' r='2' fill='%230D7C66' opacity='.04'/%3E%3Ccircle cx='170' cy='338' r='1.5' fill='%230D7C66' opacity='.04'/%3E%3Ccircle cx='152' cy='352' r='1.5' fill='%230D7C66' opacity='.04'/%3E%3Cpath d='M280 200l12 20h-24z' stroke='%230D7C66' stroke-width='.7' opacity='.05' stroke-linejoin='round'/%3E%3Cpath d='M20 260h8l4-6 8 12 8-12 8 12 4-6h8' stroke='%230D7C66' stroke-width='.6' opacity='.05' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
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
content = content.replace(/body\s*\{\s*font-family:[^}]*\}/, bodyNew);

// 4. Component updates

// .bottom-nav
content = content.replace(/\.bottom-nav\s*\{[^}]*\}/, `.bottom-nav { position:fixed; bottom:0; left:0; right:0; height:68px; background:rgba(255,255,255,0.88); backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px); border-top:1px solid var(--border); display:none; z-index:400; justify-content:space-around; align-items:center; padding:0 8px; box-shadow:0 -2px 10px rgba(0,0,0,0.04); }`);

// .bottom-nav-btn
content = content.replace(/\.bottom-nav-btn\s*\{[^}]*\}/, `.bottom-nav-btn { background:none; border:none; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:3px; font-size:10px; font-weight:500; color:var(--ink-muted); cursor:pointer; flex:1; height:100%; transition:color .15s ease; position:relative; }`);

// .bottom-nav-btn.active
content = content.replace(/\.bottom-nav-btn\.active\s*\{[^}]*\}/, `.bottom-nav-btn.active { color:var(--accent); font-weight:700; }\n  .bottom-nav-btn.active::after { content:''; position:absolute; bottom:6px; left:50%; transform:translateX(-50%); width:4px; height:4px; border-radius:50%; background:var(--accent); }`);

// .stat-card
content = content.replace(/\.stat-card\s*\{[^}]*\}/, `.stat-card { display:flex; flex-direction:column; justify-content:space-between; height:100%; background:var(--surface); border:1px solid var(--border); border-left:3px solid var(--accent); border-radius:var(--radius); padding:14px 10px; box-shadow:var(--shadow); transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1); }`);
content = content.replace(/\.stat-card:hover\s*\{[^}]*\}/, `.stat-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); z-index: 2; position: relative; }`);

// glass-modal / modal-overlay
content = content.replace(/\.modal-overlay\s*\{[^}]*\}/, `.modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.35); backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px); display:flex; align-items:center; justify-content:center; padding:20px; z-index: 500; }`);
content = content.replace(/\.modal\s*\{[^}]*\}/, `.modal { background:var(--surface); border-radius:20px; width:100%; max-width:540px; max-height:90vh; overflow-y:auto; box-shadow:0 24px 60px rgba(0,0,0,0.22); animation: modalEnter 0.4s cubic-bezier(0.32, 0.72, 0, 1); }\n  @keyframes modalEnter { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }`);

// buttons
content = content.replace(/\.btn\s*\{[^}]*\}/, `.btn { font-family:var(--font-body); font-size:13px; font-weight:600; padding:10px 16px; border-radius:8px; border:1px solid var(--border); background:var(--surface); color:var(--ink); cursor:pointer; display:inline-flex; align-items:center; justify-content:center; gap:6px; transition:background .15s ease, border-color .15s ease, color .15s ease; }`);
content = content.replace(/\.btn-primary\s*\{[^}]*\}/, `.btn-primary { background:var(--accent); border-color:var(--accent); color:#fff; box-shadow:0 4px 12px rgba(13,124,102,0.3); }`);

// .convo-overlay
content = content.replace(/\.convo-overlay\s*\{[^}]*\}/, `.convo-overlay { position:fixed; top:0; left:0; right:0; bottom:80px; z-index:300; background:var(--bg); display:flex; flex-direction:column; transform:translateX(100%); transition:transform 0.4s cubic-bezier(0.32, 0.72, 0, 1), visibility 0.4s; visibility:hidden; overflow:hidden; }`);

// .convo-header
content = content.replace(/\.convo-header\s*\{[^}]*\}/, `.convo-header { display:flex; align-items:center; gap:12px; padding:12px 16px; background:var(--accent); color:white; border-bottom:1px solid rgba(255,255,255,0.1); box-shadow:var(--shadow); z-index:10; }`);

// .convo-header-name
content = content.replace(/\.convo-header-name\s*\{[^}]*\}/, `.convo-header-name { font-weight:700; font-size:15px; color:white; }`);

// .convo-back-btn
content = content.replace(/\.convo-back-btn\s*\{[^}]*\}/, `.convo-back-btn { border:none; background:transparent; padding:6px; cursor:pointer; color:white; display:flex; align-items:center; }`);

// .toast-notification
content = content.replace(/\.toast-notification\s*\{[^}]*\}/, `.toast-notification { position: fixed; top: -100px; left: 50%; transform: translate3d(-50%, 0, 0); background: var(--surface); border: 1px solid var(--border); padding: 14px 20px; border-radius: 16px; box-shadow: var(--shadow-lg); z-index: 9999; display: flex; align-items: center; gap: 12px; transition: top 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); font-size: 13px; max-width: 380px; width: calc(100% - 32px); box-sizing: border-box; }`);

// .chat-input-area (convo-input-area)
content = content.replace(/\.convo-input-area\s*\{[^}]*\}/, `.convo-input-area { display:flex; gap:10px; padding:12px 16px; background:var(--surface); border-top:0.5px solid var(--border); align-items:center; }`);

// .chat-input (convo-input-area input)
content = content.replace(/\.convo-input-area input\s*\{[^}]*\}/, `.convo-input-area input { flex:1; padding:10px 14px; border:1px solid var(--border); border-radius:var(--radius-full); font-size:14px; background:var(--surface-2); color:var(--ink); transition: box-shadow 0.2s, border-color 0.2s; }`);
content = content.replace(/\.convo-input-area input:focus\s*\{[^}]*\}/, `.convo-input-area input:focus { outline:none; border-color:var(--accent); box-shadow: 0 0 0 3px var(--accent-soft); }`);

// .page-fade-in
let fadeOld = `  /* ---------- Tabs Transitions ---------- */
  .page-fade-in {
    animation: premiumEntrance 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    will-change: transform, opacity, filter;
  }
  @keyframes premiumEntrance {
    0% {
      opacity: 0;
      transform: scale(0.88) translateY(45px);
      filter: blur(10px);
    }
    100% {
      opacity: 1;
      transform: scale(1) translateY(0);
      filter: blur(0);
    }
  }`;
let fadeNew = `  /* ---------- Tabs Transitions ---------- */
  .page-fade-in {
    animation: premiumEntrance 0.5s ease forwards;
    will-change: transform, opacity;
  }
  @keyframes premiumEntrance {
    0% {
      opacity: 0;
      transform: translateY(16px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }`;
content = content.replace(fadeOld, fadeNew);

// 5. #splashScreen
content = content.replace(/#splashScreen\s*\{[\s\S]*?\}/, `#splashScreen {
  position: fixed; inset: 0; z-index: 99999;
  display: flex; justify-content: center; align-items: center;
  background: linear-gradient(135deg, #064E3B 0%, #0D7C66 50%, #0F766E 100%);
  transition: opacity 0.5s ease;
}`);
content = content.replace(/#splashScreen::before\s*\{[^}]*\}/, ``);

// 6. loginHTML() background and button text color
content = content.replace(/url\('login_bg\.jpg'\) no-repeat center center\/cover;/, `linear-gradient(135deg, #064E3B 0%, #0D7C66 60%, #0F766E 100%);`);
content = content.replace(/<!-- Backdrop overlay to darken\/soften the image slightly -->\s*<div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba\(15, 23, 42, 0\.45\); z-index: 1;"><\/div>/, ``);
content = content.replace(/color: #1c2d5e;/g, `color: #0D7C66;`);

// Additional custom component classes
content = content.replace(/<button class="btn btn-primary" type="submit" style="padding:10px 16px;">Send<\/button>/, `<button class="chat-send-btn" type="submit"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg></button>`);

content = content.replace(/<div class="modal-overlay" id="nmOverlay" hidden>\s*<div class="modal"/, `<div class="modal-overlay" id="nmOverlay" hidden style="align-items:flex-end; padding:0;">\n    <div class="modal nm-sheet" style="border-radius:20px 20px 0 0; margin:0;"`);

content = content.replace(/<\/style>/, `
  .chat-send-btn { width: 40px; height: 40px; border-radius: 50%; background: var(--accent); display: flex; align-items: center; justify-content: center; color: white; border: none; box-shadow: var(--shadow-md); cursor: pointer; flex-shrink: 0; transition: transform 0.2s; }
  .chat-send-btn:hover { transform: scale(1.05); }
  #nmOverlay { backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); }
  .nm-sheet { animation: sheetSlideUp 0.4s cubic-bezier(0.32, 0.72, 0, 1); }
  @keyframes sheetSlideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
</style>`);

fs.writeFileSync(path, content);
console.log("SUCCESS");
