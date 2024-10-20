// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')
export { crudStorage } from "cypress-crud/src/functions/storage.js";
export const faker = require("generate-datafaker");
import "cypress-plugin-steps";
import "cypress-crud";
import "cypress-plugin-api";
import "cypress-mochawesome-reporter/register";
import spok from "cy-spok";
// export default spok;

// close json file in variable
import _ from "lodash";
export function clone(json) {
  return _.cloneDeep(json);
}
