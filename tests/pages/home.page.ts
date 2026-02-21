import { expect, Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {

    private readonly logo: Locator;
    private readonly header: Locator;
    private readonly searchInput: Locator;

    constructor(page: Page){
        super(page);

        this.logo = page.locator('.logo');
        this.header = page.locator('header');
        this.searchInput = page.locator('#search');
    }

    async validateHomePage(){
        await expect(this.logo).toBeVisible();
        await expect(this.searchInput).toBeVisible();
    }

    async searchForProduct(term: string){
        await this.searchInput.fill(term);
        await this.searchInput.press('Enter');
    }
}