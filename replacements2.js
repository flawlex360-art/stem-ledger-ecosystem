const fs = require('fs');
const file = 'C:/Users/kpand/.gemini/antigravity/scratch/stem_ledger_mobile/www/index.html';
let content = fs.readFileSync(file, 'utf8');

// 1. .stat-card.clickable
if (!content.includes('.stat-card.clickable')) {
  content = content.replace(
    /(\.stat-card:hover\s*\{[^}]+\})/,
    `$1\n.stat-card.clickable { cursor: pointer; }`
  );
}

// 2. modal-overlay and modal (they are separated, so replace them individually)
content = content.replace(
  /\.modal-overlay\s*\{[^}]+\}/,
  `.modal-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.35);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: flex; align-items: center; justify-content: center;
  padding: 20px; z-index: 500;
}`
);

content = content.replace(
  /\.modal-overlay\[hidden\]\s*\{[^}]+\}/,
  `.modal-overlay[hidden] { display: none; }`
);

content = content.replace(
  /\.modal\s*\{[^}]+\}/,
  `.modal {
  background: var(--surface);
  border-radius: 20px;
  width: 100%; max-width: 660px; max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--shadow-lg);
}`
);

// 3. fab and fab:active
content = content.replace(
  /\.fab\s*\{[^}]+\}/,
  `.fab {
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
);
// Remove existing fab:active if any
// (but we know there wasn't any)

// 4. compact-list-item
content = content.replace(
  /\.compact-list-item\s*\{[^}]+\}/,
  `.compact-list-item {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 14px 16px;
  cursor: pointer;
  transition: background 0.15s ease, transform 0.1s ease, box-shadow 0.15s ease;
  border-left-width: 3px;
  border-left-style: solid;
  box-shadow: var(--shadow);
}`
);
content = content.replace(
  /\.compact-list-item:active\s*\{[^}]+\}/,
  `.compact-list-item:active {
  background: var(--surface-2);
  transform: scale(0.99);
}
.compact-list-item:hover {
  box-shadow: var(--shadow-md);
}`
);

// 5. chat-input-area
content = content.replace(
  /\.chat-input-area\s*\{[^}]+\}/,
  `.chat-input-area {
  padding: 10px 14px;
  background: var(--surface);
  border-top: 0.5px solid rgba(0,0,0,0.06);
  display: flex; gap: 10px; align-items: center;
  flex-shrink: 0;
}`
);
content = content.replace(
  /\.chat-input\s*\{[^}]+\}/,
  `.chat-input {
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
);


fs.writeFileSync(file, content, 'utf8');
console.log('Successfully applied remaining changes.');
