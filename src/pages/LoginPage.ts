import { Page, Locator } from '@playwright/test';
import { Logger } from '../utils/Logger';

export class LoginPage {

    // Page Reference
    private readonly page: Page;

    // Locators
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly errorMessage: Locator;

    // Constructor
    constructor(page: Page) {

        this.page = page;

        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    // Business Method
    public async login(username: string, password: string): Promise<void> {
        
        Logger.info("Entering Username")
        await this.usernameInput.fill(username);

        Logger.info("Entering password")
        await this.passwordInput.fill(password);

        Logger.info("Clicking Login button")
        await this.loginButton.click();

    }

    // Getter Method
    public async getLoginError(): Promise<string> {

        return await this.errorMessage.innerText();

    }

}