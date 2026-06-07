const{defineConfig} = require('@playwright/test');

module.exports = defineConfig({
    testDir:'./tests',
    use:{
        baseURL: 'https://qa-challenge.codesubmit.io',
        headless:false,
        screenshot:'only-on-failure',
        video:'retain-on-failure',
    },
});