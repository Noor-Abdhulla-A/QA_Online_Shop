const { test, expect } = require('@playwright/test');
const users = require('../test-data/users');

test('standard user can login successfully', async({page}) => {
await page.goto('https://qa-challenge.codesubmit.io');
await page.locator('[data-test="username"]').fill(users.standard_user.username);
await page.locator('[data-test="password"]').fill(users.standard_user.password);
await page.locator('[data-test="login-button"]').click();
await expect(page).toHaveURL(/inventory/);
await expect(page.locator('.inventory_list')).toBeVisible();
await expect(page.locator('.app_logo')).toHaveText('Swag Labs');
});

test('locked out user cannot login and sees error message', async({page}) => {
await page.goto('https://qa-challenge.codesubmit.io');
await page.locator('[data-test="username"]').fill(users.lockedout_user.username);
await page.locator('[data-test="password"]').fill(users.lockedout_user.password);
await page.locator('[data-test="login-button"]').click();
await expect(page.locator('.error-message-container')).toBeVisible();
await expect(page.locator('.error-message-container')).toContainText('locked out');
});


test('problem user can login sucessfully', async({page}) => {
await page.goto('https://qa-challenge.codesubmit.io');
await page.locator('[data-test="username"]').fill(users.problem_user.username);
await page.locator('[data-test="password"]').fill(users.problem_user.password);
await page.locator('[data-test="login-button"]').click();
await expect(page).toHaveURL(/inventory/);
await expect(page.locator('.inventory_list')).toBeVisible();
const firstImage = page.locator('.inventory_item img').first();
const src = await firstImage.getAttribute('src');
expect(src).not.toContain('sauce-labs');
});

test('performance glitch user can login sucessfully', async({page}) => {
await page.goto('https://qa-challenge.codesubmit.io');
await page.locator('[data-test="username"]').fill(users.problem_user.username);
await page.locator('[data-test="password"]').fill(users.problem_user.password);
await page.locator('[data-test="login-button"]').click();
await expect(page).toHaveURL(/inventory/,{timeout:15000});
await expect(page.locator('.inventory_list')).toBeVisible({ timeout: 15000 });
});

test('login fails when username is empty', async({page}) => {
await page.goto('https://qa-challenge.codesubmit.io');
await page.locator('[data-test="password"]').fill(users.problem_user.password);
await page.locator('[data-test="login-button"]').click();
await expect(page.locator('.error-message-container')).toBeVisible();
await expect(page.locator('.error-message-container')).toContainText('Username is required');
await expect(page).not.toHaveURL(/inventory/);
});

test('login fails when password is empty', async({page}) => {
await page.goto('https://qa-challenge.codesubmit.io');
await page.locator('[data-test="username"]').fill(users.problem_user.username);
await page.locator('[data-test="login-button"]').click();
await expect(page.locator('.error-message-container')).toBeVisible();
await expect(page.locator('.error-message-container')).toContainText('Password is required');
await expect(page).not.toHaveURL(/inventory/);
});

test('login fails with wrong credentials', async({page}) => {
await page.goto('https://qa-challenge.codesubmit.io');
await page.locator('[data-test="username"]').fill("wrong_user");
await page.locator('[data-test="password"]').fill("wrong_password");
await page.locator('[data-test="login-button"]').click();
await expect(page.locator('.error-message-container')).toBeVisible();
await expect(page.locator('.error-message-container')).toContainText('do not match');
await expect(page).not.toHaveURL(/inventory/);
});