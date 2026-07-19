import { defineConfig, type Project } from "@playwright/test";
import { env } from "./src/config/env";
//console.log("Base URL:", env.BASE_URL);
const browser = (process.env.BROWSER || "chromium").toLowerCase();

let projects: Project[] = [];

if (browser === "chromium") {
    projects.push({
        name: "Chromium",
        use: {
            browserName: "chromium",
        },
    });
}

if (browser === "firefox") {
    projects.push({
        name: "Firefox",
        use: {
            browserName: "firefox",
            channel: "firefox",
        },
    });
}

if (browser === "webkit") {
    projects.push({
        name: "WebKit",
        use: {
            browserName: "webkit",
        },
    });
}

if (browser === "all") {

    projects.push({
        name: "Chromium",
        use: {
            browserName: "chromium",
        },
    });

    projects.push({
        name: "Firefox",
        use: {
            browserName: "firefox",
        },
    });

    projects.push({
        name: "WebKit",
        use: {
            browserName: "webkit",
        },
    });

}

console.log("--------------------------------");
console.log("Browser Parameter :", browser);
console.log(
    "Projects Created :",
    projects.map(p => p.name)
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
  workers:2,
  use: {
    baseURL: env.BASE_URL,
    headless: false,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    video: "retain-on-failure"
  },

  projects,


});

