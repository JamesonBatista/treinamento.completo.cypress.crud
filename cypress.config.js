
const { defineConfig } = require("cypress");
const fs = require("fs");
const path = require("path");
const readFixtures = require("./node_modules/cypress-crud/src/runAllJson");
module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",

  e2e: {
    defaultCommandTimeout: 180000,
    pageLoadTimeout: 160000,
    requestTimeout: 160000,
    trashAssetsBeforeRuns: true,
    testIsolation: false,
    experimentalRunAllSpecs: true, 

    setupNodeEvents(on, config) {
      // reporter: "cypress-mochawesome-reporter",

      require("cypress-mochawesome-reporter/plugin")(on);
      on("task", {
        crudLog(message) {
          console.log(message);
          return null;
        },
        runFixtures({ folderPath }) {
          const fixturesDir = path.join(
            __dirname,
            "./cypress/fixtures",
            folderPath || ""
          );
          const files = readFixtures(fixturesDir);
          const data = files.map((file) => ({
            fileName: file.replace(fixturesDir + path.sep, ""),
            content: JSON.parse(fs.readFileSync(file, "utf8")),
          }));
          return data;
        },
      });
      // adjust to print size
      on("before:browser:launch", (browser, launchOptions) => {
        if (browser.family === "chromium" && browser.name !== "electron") {
          launchOptions.args.push("--window-size=1500,1200");
        }
        if (browser.name === "electron") {
          launchOptions.preferences.width = 1500;
          launchOptions.preferences.height = 1200;
        }
        if (browser.family === "firefox") {
          launchOptions.args.push("--width=1500");
          launchOptions.args.push("--height=1200");
        }
        return launchOptions;
      });
    },
  
  },
});

// CHANGE TITLE and SUBTITLE
// in cypress.env.json

// "title": "TESTING",
// "subTitle": "Project in Cypress"

