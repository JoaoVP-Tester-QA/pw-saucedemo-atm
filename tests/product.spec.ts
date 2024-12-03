import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();
const { usernameLogin, passwordLogin } = process.env;

test.describe('Product Details', () => {
  test('Check Sauce Labs Backpack & Onesie details', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', usernameLogin || '');
    await page.fill('#password', passwordLogin || '');
    await page.click('#login-button');

    const productContainerBackpack = page.locator('.inventory_item', { hasText: 'Sauce Labs Backpack' });
    await productContainerBackpack.locator('.inventory_item_name').click();
    await page.waitForSelector('.inventory_details_name');
    await page.waitForSelector('.inventory_details_price');
    
    const productDetailsTitleBackpack = await page.locator('.inventory_details_name').textContent();
    const productDetailsPriceBackpack = await page.locator('.inventory_details_price').textContent();
    
    expect(productDetailsTitleBackpack).toBe('Sauce Labs Backpack');
    expect(productDetailsPriceBackpack).toBe('$29.99');
    console.log(`Title: ${productDetailsTitleBackpack}`)
    console.log(`Price: ${productDetailsPriceBackpack}`)

    await page.getByRole('button', { name: 'Back to Products' }).click();


    const productContainerOnesie  = page.locator('.inventory_item', { hasText: 'Sauce Labs Onesie ' });
    await productContainerOnesie.locator('.inventory_item_name').click();
    await page.waitForSelector('.inventory_details_name');
    await page.waitForSelector('.inventory_details_price');
    
    const productDetailsTitleOnesie = await page.locator('.inventory_details_name').textContent();
    const productDetailsPriceOnesie = await page.locator('.inventory_details_price').textContent();
    
    expect(productDetailsTitleOnesie).toBe('Sauce Labs Onesie');
    expect(productDetailsPriceOnesie).toBe('$7.99');
    console.log(`Title: ${productDetailsTitleOnesie}`)
    console.log(`Price: ${productDetailsPriceOnesie}`)

  });
});
