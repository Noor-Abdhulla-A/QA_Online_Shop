# QA_Online_Shop
Testing the online shopping website in playwright.

Automated end-to-end test suite for the Swag Labs online shop, built with Playwright and JavaScript. This project tests the core functionality of the application across multiple user accounts to ensure reliability and correctness.

Tech Stack
Playwright — end-to-end browser automation
JavaScript — test scripting language
Node.js — runtime environment

Prerequisites
Make sure you have Node.js installed on your machine. You can download it from nodejs.org.

Installation

Clone the repository and install dependencies:
npm install
npx playwright install

Running Tests
Run all tests : npx playwright test

Run all tests with browser visible : npx playwright test --headed

Run a specific test file : npx playwright test tests/login.spec.js --headed

View the HTML test report after running : npx playwright show-report

Project Structure

QA_Online_Shop/

tests/
     login.spec.js
     cart.spec.js
     checkout.spec.js
     inventory.spec.js
test-data/
     users.js
playwright.config.js
README.md 

Test Coverage

Login Tests — 7 scenarios
Standard user can login successfully.
Locked out user cannot login and sees error message.
Problem user can login successfully.
Performance glitch user can login despite slow loading.
Login fails when username is empty.
Login fails when password is empty.
Login fails with wrong credentials.

Cart Tests — 4 scenarios
User can add a product to cart.
User can add multiple products to cart.
User can remove a product from the inventory page.
User can remove a product from the cart page.

Checkout Tests — 3 scenarios
User can complete a full purchase successfully.
Checkout fails when form fields are empty.
User can cancel checkout and return to cart.

Inventory Tests — 4 scenarios
Six products are displayed on the inventory page.
Products can be sorted by price low to high.
Product images load correctly for standard user.
Product images are broken for problem user.

User Accounts Tested
User  - Expected Behaviour
standard_user - Full functionality works as expected
locked_out_user - Cannot login, sees error message
problem_user - Can login but product images are broken
performance_glitch_user - Can login and shop despite slow load times

Key Design Decisions
Test data is kept separate from test logic inside the test-data/users.js file. This means if credentials change they only need updating in one place.
Each test file uses a beforeEach block to handle login setup automatically before every test. This avoids repeating login code and keeps individual tests clean and focused.
The playwright.config.js is configured to automatically capture screenshots and record video only when a test fails. This makes debugging failed tests much faster without slowing down passing tests.
The performance_glitch_user tests use an extended timeout of 15 seconds to account for the intentionally slow loading behaviour of this account.

Failure Artifacts
When a test fails, Playwright automatically saves the following inside the test-results folder:
Screenshot of the browser at the point of failure
Video recording of the entire test run
Error context file with full details