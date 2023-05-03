const puppeteer = require('puppeteer-extra');

(async () => {
     // Create a browser instance
     const browser = await puppeteer.launch({
          headless: true,
          dumpio: true,
          args: ['--no-sandbox'],
          executablePath: 'usr/bin/local/google-chrome-stable'
      });

     // Create a new page
     const page = await browser.newPage();

     // Set viewport width and height
     await page.setViewport({ width: 1280, height: 800 });

     const website_url = 'http://192.168.0.105';
     // const website_url = 'https://www.bannerbear.com/blog/how-to-convert-html-into-pdf-with-node-js-and-puppeteer/'

     // Open URL in current page
     await page.goto(website_url, { waitUntil: 'networkidle0' });

     const button = await page.$('#toggle-stream');

     //   // do something with the button element
     await button.click();
     await page.waitForTimeout(15000);
     // scroll to the top of the page
     await page.evaluate(() => {
          window.scrollTo(0, 0);
     });

     await page.screenshot({ path: 'screenshot.jpeg',
     clip: {
          x: 369,
          y: 59,
          width: 321,
          height: 212
        }
      });
     await browser.close();

     // Close the browser instance
     await browser.close();
})();