const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    baseUrl: 'https://6ee61bbd-8221-42bb-985e-3e14dd441c6a.mock.pstmn.io',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    chromeWebSecurity: false,
    video: false,
  },
});
