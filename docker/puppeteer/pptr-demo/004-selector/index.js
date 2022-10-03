const puppeteer = require('puppeteer');

(async () => {
  // https://www.cnblogs.com/wuweiblogs/p/12918612.html
  const browser = await puppeteer.launch({
    headless: true,
    // // executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '',
    // executablePath: '/usr/bin/chromium-browser',
    // // executablePath: 'google-chrome-stable',
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080
  });
  await page.goto('https://accounts.qq.com');
  const beforeCookies = await page.cookies();
  console.log('[before] beforeCookies', beforeCookies);

  // :nth-of-type(3)
  const loginBtnElement = await page.$('.aq-app-topbar-menu__item:nth-of-type(3)');
  // console.log('loginBtnElement', loginBtnElement);
  await loginBtnElement.click();

  // 获取页面标签里的文字
  const loginBtnText = await page.$eval('.aq-app-topbar-menu__item:nth-of-type(3)', node => node.innerText);
  console.log('loginBtnText', loginBtnText);
  // https://mlog.club/article/4588452
  await page.waitForSelector('iframe');
  // 等待 iframe 是否加载
  const loginIframe = await page.$('div#login_div iframe');
  const frame = await loginIframe.contentFrame();
  // console.log('frame', frame);
  await frame.waitForSelector('#u');
  const username = await frame.$('#u');
  await username.type('215251552');

  await frame.waitForSelector('#p');
  const password = await frame.$('#p');
  await password.type('123456');

  const usernameValue = await frame.$eval('#u', node => node.innerText);
  console.log('usernameValue', usernameValue);

  await frame.waitForSelector('#login_button');
  const loginButtonElement = await frame.$('#login_button');
  await loginButtonElement.click();
  await page.waitForTimeout(3000);
  const afterCookies = await page.cookies();
  console.log('[after] afterCookies', afterCookies);

  await page.close();
  await browser.close();
})();
