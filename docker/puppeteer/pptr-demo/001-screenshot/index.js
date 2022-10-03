const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://baidu.com');
  await page.screenshot({ path: 'baidu.png' });

  const title = await page.evaluate(() => document.getElementsByTagName('title')[0].innerText);
  console.log(`Print the title: ${title}`);
  console.log('Screenshot saved to baidu.png');

  await browser.close();
})();
