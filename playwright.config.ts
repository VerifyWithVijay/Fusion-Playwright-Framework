import { defineConfig, type Project } from "@playwright/test";
import { env } from "./src/config/env";
//console.log("Base URL:", env.BASE_URL);

import { getProjects } from "./src/config/browsers";


const browser = process.env.BROWSER || "chromium";

const projects = getProjects(browser);

console.log("--------------------------------");
console.log("Browser Parameter :", browser);
console.log(
    "Projects Created :",
    projects.map(project => project.name)
);
console.log("--------------------------------");

export default defineConfig({
  testDir: "./tests",
  timeout: 40 * 1000,   
  expect: {
     timeout: 40 * 1000
  },

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
  //retries:3,
 workers: process.env.CI ? 4 : 2,
  use: {
    baseURL: env.BASE_URL,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    video: "retain-on-failure",
    headless: env.HEADLESS,
  },

  projects,


});

