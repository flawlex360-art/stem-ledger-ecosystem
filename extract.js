const fs = require('fs');
const file = 'C:/Users/kpand/.gemini/antigravity/scratch/stem_ledger_mobile/www/index.html';
const content = fs.readFileSync(file, 'utf8');

const match = content.match(/function loginHTML\(\)[\s\S]*?return\s*`([\s\S]*?)`;/);
if (match) {
  console.log(match[0].substring(0, 1000));
} else {
  console.log("Not found");
}
