const { test, expect } = require('@playwright/test');
const users = require('../test-data/users');

test('standard user can login successfully', async({page}) => {
await page.goto('https://qa-challenge.codesubmit.io');
await page.locator('[data-test="username"]').fill(users.standard_user.username);
await page.locator('[data-test="password"]').fill(users.standard_user.password);
await page.locator('[data-test="login-button"]').click();
await expect(page).toHaveURL(/inventory/);
});

test('locked out user cannot login and sees error message', async({page}) => {
await page.goto('https://qa-challenge.codesubmit.io');
await page.locator('[data-test="username"]').fill(users.lockedout_user.username);
await page.locator('[data-test="password"]').fill(users.lockedout_user.password);
await page.locator('[data-test="login-button"]').click();
await expect(page.locator('.error-message-container')).toBeVisible();
});


test('problem user can login sucessfully', async({page}) => {
await page.goto('https://qa-challenge.codesubmit.io');
await page.locator('[data-test="username"]').fill(users.problem_user.username);
await page.locator('[data-test="password"]').fill(users.problem_user.password);
await page.locator('[data-test="login-button"]').click();
await expect(page).toHaveURL(/inventory/);
});

test('performance glitch user can login sucessfully', async({page}) => {
await page.goto('https://qa-challenge.codesubmit.io');
await page.locator('[data-test="username"]').fill(users.problem_user.username);
await page.locator('[data-test="password"]').fill(users.problem_user.password);
await page.locator('[data-test="login-button"]').click();
await expect(page).toHaveURL(/inventory/,{timeout:15000});
});

test('login fails when username is empty', async({page}) => {
await page.goto('https://qa-challenge.codesubmit.io');
await page.locator('[data-test="password"]').fill(users.problem_user.password);
await page.locator('[data-test="login-button"]').click();
await expect(page.locator('.error-message-container')).toBeVisible();
});

test('login fails when password is empty', async({page}) => {
await page.goto('https://qa-challenge.codesubmit.io');
await page.locator('[data-test="username"]').fill(users.problem_user.username);
await page.locator('[data-test="login-button"]').click();
await expect(page.locator('.error-message-container')).toBeVisible();
});

test('login fails with wrong credentials', async({page}) => {
await page.goto('https://qa-challenge.codesubmit.io');
await page.locator('[data-test="username"]').fill("wrong_user");
await page.locator('[data-test="password"]').fill("wrong_password");
await page.locator('[data-test="login-button"]').click();
await expect(page.locator('.error-message-container')).toBeVisible();
});