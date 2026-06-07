const { test, expect } = require('@playwright/test');
const users = require('../test-data/users');

test.beforeEach(async ({ page }) => {
await page.goto('https://qa-challenge.codesubmit.io');
await page.locator('[data-test="username"]').fill(users.standard_user.username);
await page.locator('[data-test="password"]').fill(users.standard_user.password);
await page.locator('[data-test="login-button"]').click();
await expect(page).toHaveURL(/inventory/);
});

test('user can add a product to cart', async ({ page }) => {
await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
await expect(page.locator('.shopping_cart_badge')).toBeVisible();
await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
});

test('user can add multiple products to cart', async ({ page }) => {
await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
await expect(page.locator('[data-test="remove-sauce-labs-bike-light"]')).toBeVisible();
});

test('user can remove product from inventory page', async ({ page }) => {
await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
await expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible();
});

test('user can remove product from cart page', async ({ page }) => {
await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
await page.locator('.shopping_cart_link').click();
await expect(page).toHaveURL(/cart/);
await expect(page.locator('.cart_item')).toHaveCount(1);
await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
await expect(page.locator('.cart_item')).toHaveCount(0);
await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
});