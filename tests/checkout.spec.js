const { test, expect } = require('@playwright/test');
const users = require('../test-data/users');

test.beforeEach(async ({ page }) => {
await page.goto('https://qa-challenge.codesubmit.io');
await page.locator('[data-test="username"]').fill(users.standard_user.username);
await page.locator('[data-test="password"]').fill(users.standard_user.password);
await page.locator('[data-test="login-button"]').click();
await expect(page).toHaveURL(/inventory/);
await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
await page.locator('.shopping_cart_link').click();
await expect(page).toHaveURL(/cart/);
});


test('user can complete full purchase successfully', async ({ page }) => {
await page.locator('[data-test="checkout"]').click();
await expect(page).toHaveURL(/checkout-step-one/);
await page.locator('[data-test="firstName"]').fill('Test');
await page.locator('[data-test="lastName"]').fill('User');
await page.locator('[data-test="postalCode"]').fill('12345');
await page.locator('[data-test="continue"]').click();
await expect(page).toHaveURL(/checkout-step-two/);
await expect(page.locator('.cart_item')).toBeVisible();
await expect(page.locator('.summary_total_label')).toBeVisible();
await page.locator('[data-test="finish"]').click();
await expect(page).toHaveURL(/checkout-complete/);
await expect(page.locator('[data-test="complete-header"]')).toBeVisible();
await expect(page.locator('[data-test="complete-header"]')).toContainText('Thank you');
});


test('checkout fails when form fields are empty', async ({ page }) => {
await page.locator('[data-test="checkout"]').click();
await page.locator('[data-test="continue"]').click();
await expect(page.locator('.error-message-container')).toBeVisible();
await expect(page.locator('.error-message-container')).toContainText('First Name is required');
await expect(page).toHaveURL(/checkout-step-one/);
});


test('user can cancel checkout and return to cart', async ({ page }) => {
await page.locator('[data-test="checkout"]').click();
await expect(page).toHaveURL(/checkout-step-one/);
await page.locator('[data-test="cancel"]').click();
await expect(page).toHaveURL(/cart/);
await expect(page.locator('.cart_item')).toHaveCount(1);
});