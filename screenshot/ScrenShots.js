const puppeteer = require('puppeteer');
const fs = require('fs');

const URL = 'https://github.com/';

(async () => {
    // NOTE: Puppeteer sets an initial page size to 800px x 600px, which defines the screenshot size.
    // The page size can be customized with Page.setViewport()

    const dir = './screenshot';

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    const browser = await puppeteer.launch({
        headless: false,
        ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();

    page.setViewport({
        width: 1920,
        height: 1080,
    })

    await page.goto(URL, {
        waitUntil: ['networkidle0', 'domcontentloaded'],
        // timeout: 30000,
    });

    await page.screenshot({
        path: 'screenshot/example.png',
    })

    await page.screenshot({
        path: 'screenshot/fullpage.png',
        fullPage: true,
    })

    await browser.close();
})();