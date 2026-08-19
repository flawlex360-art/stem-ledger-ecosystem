const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('LOG:', msg.text()));
  page.on('pageerror', err => console.log('ERROR:', err.message));

  await page.goto('http://localhost:8000/index.html');
  await page.waitForTimeout(2000);
  
  // Click on the messages nav item
  console.log("Clicking messages...");
  await page.evaluate(() => {
      document.querySelector('[data-target="chat"]').click();
  });
  
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'C:\\Users\\kpand\\.gemini\\antigravity\\brain\\ff5f700b-4eed-4624-a2ac-29b5ed6ad87d\\artifacts\\screenshot.png' });
  
  console.log("Screenshot taken.");
  await browser.close();
})();
