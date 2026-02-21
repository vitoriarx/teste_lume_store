import {expect, Page, Locator} from '@playwright/test';
import {BasePage} from './base.page';

export class ProductPage extends BasePage{ 


    private readonly productContainer: Locator;
    private readonly productTitle: Locator;

    constructor(page: Page){
        super(page);

        this.productContainer = page.locator('.product-info-main');
        this.productTitle = page.locator('.product-info-main .page-title');
    }
    async validateProductPageLoaded(){
        await expect(this.productContainer).toBeVisible({ timeout: 15000 });
    }
}
    
