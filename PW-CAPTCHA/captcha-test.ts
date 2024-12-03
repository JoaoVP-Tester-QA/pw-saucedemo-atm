import { chromium } from 'playwright';
import axios from 'axios';

const solveCaptcha = async (siteKey: string, pageUrl: string, apiKey: string): Promise<string> => {
    console.log('Requesting CAPTCHA solution from 2Captcha...');
    const response = await axios.post('https://2captcha.com/in.php', null, {
        params: {
            key: apiKey,
            method: 'userrecaptcha',
            googlekey: siteKey,
            pageurl: pageUrl,
            json: 1,
        },
    });

    if (response.data.status !== 1) {
        throw new Error(`Failed to send CAPTCHA to 2Captcha: ${response.data.request}`);
    }

    const requestId = response.data.request;
    console.log(`CAPTCHA request ID received: ${requestId}`);

    console.log('Waiting for CAPTCHA solution...');
    while (true) {
        const result = await axios.get('https://2captcha.com/res.php', {
            params: {
                key: apiKey,
                action: 'get',
                id: requestId,
                json: 1,
            },
        });

        if (result.data.status === 1) {
            console.log('CAPTCHA solution received!');
            return result.data.request;
        }

        console.log('CAPTCHA solution not ready, retrying in 5 seconds...');
        await new Promise((resolve) => setTimeout(resolve, 5000));
    }
};

(async () => {
    const apiKey = 'YOUR_2CAPTCHA_API_KEY'; //
    const siteKey = '6Le-wvkSAAAAAPBMRTvw0Q4Muexq9bi0DJwx_mJ-';
    const pageUrl = 'https://google.com/recaptcha/api2/demo';

    try {
        console.log('Starting CAPTCHA bypass script...');
        const captchaSolution = await solveCaptcha(siteKey, pageUrl, apiKey);
        console.log(`CAPTCHA solution obtained: ${captchaSolution}`);

        const browser = await chromium.launch({ headless: false });
        const context = await browser.newContext();
        const page = await context.newPage();

        console.log('Navigating to the target page...');
        await page.goto(pageUrl);

        console.log('Injecting CAPTCHA solution...');
        await page.evaluate((solution) => {
            const captchaElement = document.getElementById('g-recaptcha-response') as HTMLTextAreaElement;
            if (!captchaElement) {
                throw new Error('CAPTCHA element not found on the page');
            }
            captchaElement.value = solution;
        }, captchaSolution);

        console.log('Submitting the form...');
        await page.click('#recaptcha-demo-submit');

        console.log('CAPTCHA bypassed successfully!');
        await browser.close();
    } catch (error) {
        if (error instanceof Error) {
            console.error('An error occurred:', error.message);
        } else {
            console.error('An unknown error occurred:', error);
        }
    }
})();
