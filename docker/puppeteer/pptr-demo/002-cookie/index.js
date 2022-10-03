const puppeteer = require('puppeteer');

(async () => {
  // https://aaron-bird.github.io/2019/04/22/puppeteer%E5%85%A5%E9%97%A8/
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://accounts.qq.com');

  const cookies = await page.cookies();
  console.log('[before] cookies', cookies);
  // 设置 Cookie
  await page.setCookie({
    name: 'ocean',
    value: 'test'
  });

  const cookies2 = await page.cookies();
  console.log('[after] setCookie', cookies2);

  const evaluateCookie2 = await page.evaluate(() => {
    console.log('[evaluate] document.cookie', document.cookie);
    return document.cookie;
  });
  console.log('[evaluate] [document.cookie] evaluateCookie2', evaluateCookie2);
  // 删除 Cookie
  await page.deleteCookie({
    name: 'ocean',
    value: 'test'
  });

  const evaluateCookie3 = await page.evaluate(() => document.cookie);
  console.log('[evaluate] [document.cookie] evaluateCookie3', evaluateCookie3);
  const cookies3 = await page.cookies();
  console.log('[after] deleteCookie', cookies3);

  await browser.close();
})();
