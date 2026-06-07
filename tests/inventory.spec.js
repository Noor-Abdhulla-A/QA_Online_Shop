const { test, expect } = require('@playwright/test');
const users = require('../test-data/users');


test.beforeEach(async ({ page }) => {
await page.goto('https://qa-challenge.codesubmit.io');
await page.locator('[data-test="username"]').fill(users.standard_user.username);
await page.locator('[data-test="password"]').fill(users.standard_user.password);
await page.locator('[data-test="login-button"]').click();
await expect(page).toHaveURL(/inventory/);
});


test('six products are displayed on inventory page', async ({ page }) => {
await expect(page.locator('.inventory_item')).toHaveCount(6);
await expect(page.locator('.inventory_item_name').first()).toBeVisible();
await expect(page.locator('.inventory_item_price').first()).toBeVisible();
await expect(page.locator('.inventory_item img').first()).toBeVisible();
});


test('products can be sorted by price low to high', async ({ page }) => {
await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
const prices = page.locator('.inventory_item_price');
const firstPrice = await prices.first().textContent();
const lastPrice = await prices.last().textContent();
const first = parseFloat(firstPrice.replace('$', ''));
const last = parseFloat(lastPrice.replace('$', ''));
expect(first).toBeLessThan(last);
});


test('product images load correctly for standard user', async ({ page }) => {
const images = page.locator('.inventory_item img');
await expect(images).toHaveCount(6);
await expect(images.first()).toBeVisible();
const firstSrc = await images.first().getAttribute('src');
const secondSrc = await images.nth(1).getAttribute('src');
expect(firstSrc).not.toBeNull();
expect(firstSrc).toContain('/static/media/');
expect(firstSrc).not.toBe(secondSrc);
});


test('product images are broken for problem user', async ({ page }) => {
await page.goto('https://qa-challenge.codesubmit.io');
await page.locator('[data-test="username"]').fill(users.problem_user.username);
await page.locator('[data-test="password"]').fill(users.problem_user.password);
await page.locator('[data-test="login-button"]').click();
await expect(page).toHaveURL(/inventory/);
const images = page.locator('.inventory_item img');
await expect(images.first()).toBeVisible();
const firstSrc = await images.first().getAttribute('src');
const secondSrc = await images.nth(1).getAttribute('src');
expect(firstSrc).not.toBeNull();
expect(firstSrc).toBe(secondSrc);
});