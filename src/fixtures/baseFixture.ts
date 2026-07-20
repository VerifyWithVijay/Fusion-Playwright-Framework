import { test as base } from "@playwright/test";

import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import * as allure from "allure-js-commons";

type MyFixtures = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
};

export const test = base.extend<MyFixtures>({

  page: async ({ page }, use, testInfo) => {

    console.log("Project =", testInfo.project.name);
    console.log("Browser =", testInfo.project.use.browserName);

     await allure.parameter(
        "Environment",
        process.env.TEST_ENV ?? "qa"
    );

    await allure.parameter(
        "Browser",
        testInfo.project.use.browserName!
    );

    await allure.parameter(
        "Project",
        testInfo.project.name
    );

    await use(page);

},
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },    

  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },
});

export { expect } from "@playwright/test";
