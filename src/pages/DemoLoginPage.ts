import { Page, expect } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {
    this.page = page;
  }

  username = this.page.locator("#user-name");

  password = this.page.locator("#password");

  loginButton = this.page.locator("#login-button");

  errorMessage = this.page.locator('[data-test="error"]');

  async login(username: string, password: string) {
    await this.username.fill(username);

    await this.password.fill(password);

    await this.loginButton.click();
  }

  async verifyError(expectedMessage: string) {
    await expect(this.errorMessage).toContainText(expectedMessage);
  }
}
