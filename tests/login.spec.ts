import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

const { usernameLogin, passwordLogin, usernameLoginInvalid, passwordLoginInvalid } = process.env;

test.describe('Login Tests', () => {
  test('Successful login', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', usernameLogin || '');
    await page.fill('#password', passwordLogin || '');
    await page.click('#login-button');
    
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('Login with invalid credentials', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', usernameLoginInvalid || '');
    await page.fill('#password', passwordLoginInvalid || '');
    await page.click('#login-button');
    const errorMessage = await page.locator('[data-test="error"]').textContent();
    expect(errorMessage).toContain('Username and password do not match');
  });

  test('Successful Login & Successful Logout', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', usernameLogin || '');
    await page.fill('#password', passwordLogin || '');
    await page.click('#login-button');
    
    await expect(page).toHaveURL(/inventory.html/);

    await page.click('#react-burger-menu-btn');

    await page.waitForSelector('#logout_sidebar_link');
    await page.click('#logout_sidebar_link');

    await expect(page).toHaveURL('https://www.saucedemo.com/');
});


})