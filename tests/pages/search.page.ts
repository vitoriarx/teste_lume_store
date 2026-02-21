import {expect, Page, Locator} from '@playwright/test';
import {BasePage} from './base.page';

export class SearchPage extends BasePage {
        private readonly productItems: Locator;

        constructor(page: Page){
            super(page);
            this.productItems = page.locator('.product-item'); 
        }

        async waitForSearchResponse(){
            await this.page.waitForResponse(response => 
            response.url().includes('search') && 
            response.status() === 200
        );
    }

    async validateSearchUrl(term: string){
        await expect(this.page).toHaveURL(new RegExp(term, 'i'));
    }

    async validateSearchResults(){
        const count = await this.productItems.count();
        expect(count).toBeGreaterThan(0);
    }

    async clickLastProduct(){
        await expect(this.productItems.last()).toBeVisible();
        await this.productItems.last().click();
    }
}