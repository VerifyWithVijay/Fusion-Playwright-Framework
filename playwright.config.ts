import { defineConfig } from "@playwright/test";
import { env } from "./src/config/env";

export default defineConfig({
  testDir: "./tests",

  reporter: [
    ['html'],
    ['allure-playwright',
{
        detail: true,
        suiteTitle: true,
        environmentInfo: {
          name: "QA Environment",
          appName: "Fusion Automation Framework",
          url: "https://www.saucedemo.com",
          browser: "Chrome",
          release: "1.0",
          node_version: process.version,
        },
      },


    ]
  ],
  fullyParallel:true,
  retries:3,
  workers:2,
  use: {
    baseURL: env.BASE_URL,
    headless: false,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    video: "retain-on-failure"
  },

  projects: [
    { name: 'Chromium' },
    { name: 'Firefox' },
    { name: 'WebKit' }
]
});
