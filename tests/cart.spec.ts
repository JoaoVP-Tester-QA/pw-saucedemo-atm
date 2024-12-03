import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

const { usernameLogin, passwordLogin } = process.env;

test.describe('Cart Functionality', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('https://www.saucedemo.com/');
      await page.fill('#user-name', usernameLogin || '');
      await page.fill('#password', passwordLogin || '');
      await page.click('#login-button');
    });


    test('Add Sauce Labs Backpack to cart', async ({ page }) => {
      await page.locator('#add-to-cart-sauce-labs-backpack').click();
      const cartBadge = await page.locator('.shopping_cart_badge').textContent();
      expect(cartBadge).toBe('1');
      console.log(`Add: ${cartBadge} itens`);

      await page.locator('#remove-sauce-labs-backpack').click();
      await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();      
      console.log(`Removed: ${cartBadge} itens`);
    });

    test('In product add Sauce Labs Backpack to cart', async ({ page }) => {
      const productContainerBackpack = page.locator('.inventory_item', { hasText: 'Sauce Labs Backpack' });
      await productContainerBackpack.locator('.inventory_item_name').click();
      await page.waitForSelector('.inventory_details_name');
      await page.waitForSelector('.inventory_details_price');

      await page.locator('#add-to-cart').click();
      const cartBadge = await page.locator('.shopping_cart_badge').textContent();
      expect(cartBadge).toBe('1');
      console.log(`Add: ${cartBadge} itens`);

      await page.locator('#remove').click();
      await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();      
      console.log(`Removed: ${cartBadge} itens`);
    });


  });
  