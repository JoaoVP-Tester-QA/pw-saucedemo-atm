import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import * as dotenv from 'dotenv';

dotenv.config();

const { usernameLogin, passwordLogin } = process.env;

test.describe('Checkout Process', () => {
    test('Complete Checkout', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.fill('#user-name', usernameLogin || '');
        await page.fill('#password', passwordLogin || '');
        await page.click('#login-button');
    
        await page.click('#add-to-cart-sauce-labs-backpack');
        await page.click('.shopping_cart_link');
        await page.click('#checkout');
    
        await page.fill('#first-name', faker.person.firstName());
        await page.fill('#last-name', faker.person.lastName());
        await page.fill('#postal-code', Math.floor(Math.random() * 10000).toString());
        await page.click('#continue');

        const productName = await page.locator('.inventory_item_name').textContent();
        const productPrice = await page.locator('.inventory_item_price').textContent();
        const totalPrice = await page.locator('.summary_total_label').textContent();

        expect(productName).toBe('Sauce Labs Backpack');
        expect(productPrice).toBe('$29.99');
        expect(totalPrice).toContain('$32.39');

        await page.click('#finish');
    
        const successMessage = await page.locator('.complete-header').textContent();
        expect(successMessage).toBe('Thank you for your order!');
        await expect(page.locator('.shopping_cart_badge')).not.toBeVisible(); 
    });
});
