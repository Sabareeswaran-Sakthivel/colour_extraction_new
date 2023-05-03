const puppeteer = require("puppeteer-extra");
// Add stealth plugin and use defaults (all tricks to hide puppeteer usage)
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());
// Add adblocker plugin to block all ads and trackers (saves bandwidth)
const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

// app.post("/hapag-login", async (req, res) => {
const lambdaHandler = async (event, context) => {
  const url = "http://192.168.117.155/";
  //   console.log(`URL: ${url}`);
  const browser = await puppeteer.launch({
    headless: true,
    dumpio: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--single-process",
      "--disable-web-security",
    ],
    executablePath: "/usr/bin/google-chrome",
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  try {
    await page.goto(url);
    const button = await page.$("#toggle-stream");

    //   // do something with the button element
    await button.click();
    await page.waitForTimeout(25000);

    await page.evaluate(() => {
      window.scrollTo(0, 0);
    });

    await page.screenshot({
      path: "./test/screenshot.jpeg",
      clip: {
        x: 367,
        y: 55,
        width: 325,
        height: 219,
      },
    });
    console.log("success");
    await browser.close();
  } catch (error) {
    log.error("error");
  }
};

// module.exports = { handler: lambdaHandler };

async function getToken() {
  await lambdaHandler(null, null);
}

getToken();
// });
