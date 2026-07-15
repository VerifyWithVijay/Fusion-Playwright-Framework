import { Page, Locator } from '@playwright/test';

export class InventoryPage {

    private readonly page: Page;

    private readonly productsTitle: Locator;
    private readonly shoppingCartLink: Locator;

    constructor(page: Page) {

        this.page = page;

        this.productsTitle = this.page.locator('[data-test="title"]');
        this.shoppingCartLink = this.page.locator('[data-test="shopping-cart-link"]');
    }

    public async isInventoryPageDisplayed(): Promise<boolean> {

        return await this.productsTitle.isVisible();

    }

}