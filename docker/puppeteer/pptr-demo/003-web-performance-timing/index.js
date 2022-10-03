const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport({
    width: 1920,
    height: 1080
  });
  await page.goto('https://accounts.qq.com');

  const pagePerformanceTiming = JSON.parse(
    await page.evaluate(() => {
      // https://www.zoo.team/article/puppeteer
      // https://juejin.cn/post/6844903904849707016
      const timing = window.performance.timing;
      return JSON.stringify(timing);
    })
  );

  console.log('pagePerformanceTiming', pagePerformanceTiming);
  await page.close();
  await browser.close();
})();