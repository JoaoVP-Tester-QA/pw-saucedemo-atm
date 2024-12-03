import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

const { usernameLogin, passwordLogin } = process.env;

test.describe('Filter Products', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.fill('#user-name', usernameLogin || '');
        await page.fill('#password', passwordLogin || '');
        await page.click('#login-button');
    });

    test('Sort products by price: low to high', async ({ page }) => {
        await page.selectOption('.product_sort_container', 'lohi');

        const prices = await page.locator('.inventory_item_price').allTextContents();
        const pricesNumeric = prices.map(price => parseFloat(price.replace('$', '')));
        expect(pricesNumeric).toEqual([...pricesNumeric].sort((a, b) => a - b));
    });

    test('Sort products by price: high to low', async ({ page }) => {
        await page.selectOption('.product_sort_container', 'hilo');

        const prices = await page.locator('.inventory_item_price').allTextContents();
        const pricesNumeric = prices.map(price => parseFloat(price.replace('$', '')));
        expect(pricesNumeric).toEqual([...pricesNumeric].sort((a, b) => b - a));
    });

    test('Sort products by name: A to Z', async ({ page }) => {
        await page.selectOption('.product_sort_container', 'az');

        const names = await page.locator('.inventory_item_name').allTextContents();
        expect(names).toEqual([...names].sort());
    });

    test('Sort products by name: Z to A', async ({ page }) => {
        await page.selectOption('.product_sort_container', 'za');

        const names = await page.locator('.inventory_item_name').allTextContents();
        expect(names).toEqual([...names].sort().reverse());
    });
});
