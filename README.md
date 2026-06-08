# QA_Online_Shop
Testing the online shopping website in playwright.

## My Solution

I built the automated test suite using Playwright and JavaScript. The tests 
cover the four core areas of the application — login, cart, checkout, and 
product inventory — across all four user accounts provided.

The full suite contains **18 tests** and runs in approximately **35 seconds**.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| Playwright | Browser automation and test runner |
| JavaScript | Scripting language |
| Node.js | Runtime environment |

---

## Setup and Installation

Make sure you have Node.js installed from [nodejs.org](https://nodejs.org), 
then run the following:

```bash
npm install
npx playwright install

How to Run

# Run all tests
npx playwright test

# Run with visible browser
npx playwright test --headed

# Run a single file
npx playwright test tests/login.spec.js

# View HTML report after running
npx playwright show-report

Project Structure

QA_Online_Shop/
├── tests/
│ ├── login.spec.js — login scenarios for all user types
│ ├── cart.spec.js — adding and removing products
│ ├── checkout.spec.js — full purchase flow and edge cases
│ └── inventory.spec.js — product display, sorting and images
├── test-data/
│ └── users.js — all user credentials in one place
├── playwright.config.js — Playwright configuration and reporter
└── README.md

```

Test Coverage

Login — 7 tests

- Standard user can login successfully
- Locked out user cannot login and sees error message
- Problem user can login but has broken images
- Performance glitch user can login despite slow loading
- Login fails when username is empty
- Login fails when password is empty
- Login fails with wrong credentials

Cart — 4 tests

- User can add a product to cart
- User can add multiple products to cart
- User can remove a product from the inventory page
- User can remove a product from the cart page

Checkout — 3 tests

- User can complete a full purchase successfully
- Checkout fails when form fields are left empty
- User can cancel checkout and return to cart

Inventory — 4 tests

- Six products are displayed on the inventory page
- Products can be sorted by price low to high
- Product images load correctly for standard user
- Product images are broken for problem user


Notes

Test data is centralised. All credentials live in test-data/users.js rather than being hardcoded inside each test file. If anything changes it
only needs updating in one place.

beforeEach handles setup. Each test file uses a beforeEach block to run login automatically before every test. This keeps individual tests clean
and focused only on what they are actually checking.

Failures include full evidence. Screenshots and videos are only captured when a test fails so normal runs stay fast. When something does fail the HTML report includes a screenshot and full video of exactly what happened. 

Glitch user has extended timeout. The performance glitch user tests use a 15 second timeout to account for the intentionally slow loading behaviour of that account without causing false failures.
