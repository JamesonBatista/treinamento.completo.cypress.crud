
const { defineConfig } = require("cypress");

const config = require("./cypress.config");

const e2e = {
  ...config.e2e,
  env: {
    endpoint: "https://restcountries.com/v3.1/translation/germany",
    reqres: "https://reqres.in/api/users/2",
    swagger: "https://fakerestapi.azurewebsites.net/api/v1/",
    location: "https://rickandmortyapi.com/api/location",
    ...config.env,
  },

  testIsolation: false, //  in e2e:{}
  experimentalRunAllSpecs: true, // in e2e:{}
  chromeWebSecurity: false,
};

module.exports = defineConfig({
  ...config,
  e2e,
});

// IN PACKAGE.JSON
// "scripts": {
//     "cy:run:qa": "cypress run --config-file env_qa.js"
//   },
