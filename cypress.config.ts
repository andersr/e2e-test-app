
import Cypress, { defineConfig } from "cypress";

interface Config extends Cypress.UserConfigOptions<any> {
  "cypress-watch-and-reload": {
    watch: string | string[]
  }
}

const config: Partial<Config> = {
  "cypress-watch-and-reload": {
    watch: ["src/**/*"],
  },
  e2e: {
    setupNodeEvents(on, config) {
      return require("cypress-watch-and-reload/plugins")(on, config);
    },
  },
}

export default defineConfig(config);