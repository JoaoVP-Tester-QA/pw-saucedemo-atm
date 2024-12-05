import { test, expect, Page } from '@playwright/test';
import { faker } from '@faker-js/faker';
import * as dotenv from 'dotenv';

dotenv.config();

const { usernameLogin, passwordLogin, usernameLoginInvalid, passwordLoginInvalid } = process.env;

async function loginWithValidCredentials(page: Page) {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', usernameLogin || '');
  await page.fill('#password', passwordLogin || '');
  await page.click('#login-button');
  await expect(page).toHaveURL(/inventory.html/);
}

test.describe('E2E Tests for SauceDemo', () => {
  test('Login with invalid credentials', async ({ page }) => {
    await test.step('Given the user is on the login page', async () => {
      await page.goto('https://www.saucedemo.com/');
    });

    await test.step('When the user enters invalid credentials', async () => {
      await page.fill('#user-name', usernameLoginInvalid || '');
      await page.fill('#password', passwordLoginInvalid || '');
      await page.click('#login-button');
    });

    await test.step('Then an error message is displayed', async () => {
      const errorMessage = await page.locator('[data-test="error"]').textContent();
      expect(errorMessage).toContain('Username and password do not match');
    });
  });

  test('Successful Login', async ({ page }) => {
    await test.step('Given the user is on the login page', async () => {
      await page.goto('https://www.saucedemo.com/');
    });

    await test.step('When the user logs in with valid credentials', async () => {
      await page.fill('#user-name', usernameLogin || '');
      await page.fill('#password', passwordLogin || '');
      await page.click('#login-button');
    });

    await test.step('Then the user is redirected to the inventory page', async () => {
      await expect(page).toHaveURL(/inventory.html/);
    });
  });

  test('Check Product Details & Change the Product', async ({ page }) => {
    await test.step('Given the user is on the inventory page', async () => {
      await page.goto('https://www.saucedemo.com/');
      await loginWithValidCredentials(page);
      await expect(page).toHaveURL(/inventory.html/);
    });

    await test.step('When the user views details for Sauce Labs Backpack', async () => {
      const productContainerBackpack = page.locator('.inventory_item', { hasText: 'Sauce Labs Backpack' });
      await productContainerBackpack.locator('.inventory_item_name').click();
    });

    await test.step('Then the product details for Sauce Labs Backpack are correct & Come back to Products', async () => {
      const productDetailsTitleBackpack = await page.locator('.inventory_details_name').textContent();
      const productDetailsPriceBackpack = await page.locator('.inventory_details_price').textContent();
      expect(productDetailsTitleBackpack).toBe('Sauce Labs Backpack');
      expect(productDetailsPriceBackpack).toBe('$29.99');
      await page.getByRole('button', { name: 'Back to Products' }).click();
    });

    await test.step('When the user views details for Sauce Labs Onesie', async () => {
      const productContainerOnesie = page.locator('.inventory_item', { hasText: 'Sauce Labs Onesie' });
      await productContainerOnesie.locator('.inventory_item_name').click();
    });

    await test.step('Then the product details for Sauce Labs Onesie are correct & Come back to Products', async () => {
      const productDetailsTitleOnesie = await page.locator('.inventory_details_name').textContent();
      const productDetailsPriceOnesie = await page.locator('.inventory_details_price').textContent();
      expect(productDetailsTitleOnesie).toBe('Sauce Labs Onesie');
      expect(productDetailsPriceOnesie).toBe('$7.99');
      await page.getByRole('button', { name: 'Back to Products' }).click();
    });
  });

  test('Sort Products by Various Criteria', async ({ page }) => {
    await test.step('Given the user is on the inventory page', async () => {
      await loginWithValidCredentials(page);
    });

    await test.step('When the user sorts products by price: low to high', async () => {
      await page.selectOption('.product_sort_container', 'lohi');
    });

    await test.step('Then products are sorted in ascending order by price', async () => {
      const pricesLowToHigh = await page.locator('.inventory_item_price').allTextContents();
      const pricesNumericLowToHigh = pricesLowToHigh.map(price => parseFloat(price.replace('$', '')));
      expect(pricesNumericLowToHigh).toEqual([...pricesNumericLowToHigh].sort((a, b) => a - b));
    });

    await test.step('When the user sorts products by price: high to low', async () => {
      await page.selectOption('.product_sort_container', 'hilo');
    });

    await test.step('Then products are sorted in descending order by price', async () => {
      const pricesHighToLow = await page.locator('.inventory_item_price').allTextContents();
      const pricesNumericHighToLow = pricesHighToLow.map(price => parseFloat(price.replace('$', '')));
      expect(pricesNumericHighToLow).toEqual([...pricesNumericHighToLow].sort((a, b) => b - a));
    });

    await test.step('When the user sorts products by name: A to Z', async () => {
      await page.selectOption('.product_sort_container', 'az');
    });

    await test.step('Then products are sorted alphabetically by name', async () => {
      const namesAtoZ = await page.locator('.inventory_item_name').allTextContents();
      expect(namesAtoZ).toEqual([...namesAtoZ].sort());
    });

    await test.step('When the user sorts products by name: Z to A', async () => {
      await page.selectOption('.product_sort_container', 'za');
    });

    await test.step('Then products are sorted in reverse alphabetical order by name', async () => {
      const namesZtoA = await page.locator('.inventory_item_name').allTextContents();
      expect(namesZtoA).toEqual([...namesZtoA].sort().reverse());
    });
  });

  test('Add Product to Cart', async ({ page }) => {
    await test.step('Given the user is on the inventory page', async () => {
      await loginWithValidCredentials(page);
    });

    await test.step('When the user adds Sauce Labs Backpack to the cart', async () => {
      await page.locator('#add-to-cart-sauce-labs-backpack').click();
    });

    await test.step('Then the cart badge updates to show 1 item', async () => {
      const cartBadge = await page.locator('.shopping_cart_badge').textContent();
      expect(cartBadge).toBe('1');
    });
  });

  test('Complete Checkout Process', async ({ page }) => {
    await test.step('Given the user has a product in the cart', async () => {
      await loginWithValidCredentials(page);
      await page.locator('#add-to-cart-sauce-labs-backpack').click();
      const cartBadge = await page.locator('.shopping_cart_badge').textContent();
      expect(cartBadge).toBe('1');
    });

    await test.step('When the user proceeds to checkout', async () => {
      await page.click('.shopping_cart_link');
      await page.click('#checkout');
    });

    await test.step('When the user fills out their details', async () => {
      await page.fill('#first-name', faker.person.firstName());
      await page.fill('#last-name', faker.person.lastName());
      await page.fill('#postal-code', Math.floor(Math.random() * 10000).toString());
      await page.click('#continue');
    });

    await test.step('Then the order summary is correct', async () => {
      const productName = await page.locator('.inventory_item_name').textContent();
      const productPrice = await page.locator('.inventory_item_price').textContent();
      const totalPrice = await page.locator('.summary_total_label').textContent();
      expect(productName).toBe('Sauce Labs Backpack');
      expect(productPrice).toBe('$29.99');
      expect(totalPrice).toContain('$32.39');
    });

    await test.step('When the user completes the order', async () => {
      await page.click('#finish');
    });

    await test.step('Then the user sees a success message', async () => {
      const successMessage = await page.locator('.complete-header').textContent();
      expect(successMessage).toBe('Thank you for your order!');
    });
  });
});
