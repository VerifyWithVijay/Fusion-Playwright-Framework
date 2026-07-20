import * as allure from "allure-js-commons";
import { test, expect } from "../../src/fixtures/baseFixture";
//import { LoginPage } from '../../src/pages/LoginPage';
//import { InventoryPage } from '../../src/pages/InventoryPage';
import { loginTestData } from "../../test-data/loginData";
import { env } from "../../src/config/env";
import { Logger } from "../../src/utils/Logger";


// test.beforeEach(async ({ page }) => {
//   await page.goto("/");
// });

test.beforeEach(async ({ page }) => {
    await page.goto("/", {
        waitUntil: "networkidle",
    });
});

test.only("Verify user can login successfully", async ({ loginPage, inventoryPage }) => {
  await allure.parentSuite("Authentication");
  await allure.suite("Login");
  await allure.severity("critical");
  await allure.owner("Vijay");
  Logger.info("Starting successful login test");
  // await page.goto('/');



  //const loginPage = new LoginPage(page);

  await allure.step("Login with valid credentials", async () => {
  await loginPage.login(env.USERNAME, env.PASSWORD);
});
  //const inventoryPage = new InventoryPage(page);

  //Logger.info(`Logging in with user: ${env.USERNAME}`);
  //Logger.info(`Logging in with user: ${env.PASSWORD}`);

  await allure.step("Verify Inventory page is displayed", async () => {
  Logger.info("Verifying Inventory page is displayed");

  //await expect(await inventoryPage.isInventoryPageDisplayed()).toBeTruthy();
  const isDisplayed =
    await inventoryPage.isInventoryPageDisplayed();

  expect(isDisplayed).toBeTruthy();
 // Logger.info("Successful login test completed");
  });
});

for (const data of loginTestData) {
  test(data.testName, async ({ loginPage }) => {
   // Logger.info("Starting Negative login test");
    // Arrange
    //   await page.goto('/');

    // const loginPage = new LoginPage(page);

    // Act
    await loginPage.login(data.username, data.password);

    // Assert
    await expect(await loginPage.getLoginError()).toContain(data.expectedError);
    Logger.info("Negative login validation completed");
  });
}
