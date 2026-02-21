import {expect, Page, Locator} from '@playwright/test';
import {BasePage} from './base.page';

export class ProductPage extends BasePage{ 


    private readonly productContainer: Locator;
    private readonly productTitle: Locator;
    private readonly sizeOptions: Locator;
    private readonly colorOptions: Locator;
    private readonly addToCartButton: Locator;
    private readonly successMessage: Locator;

    constructor(page: Page){
        super(page);

        this.productContainer = page.locator('.product-info-main');
        this.productTitle = page.locator('.product-info-main .page-title');

        this.sizeOptions = page.locator('.swatch-attribute.size .swatch-option');
        this.colorOptions = page.locator('.swatch-attribute.color .swatch-option');
        this.addToCartButton = page.locator('#product-addtocart-button');
        this.successMessage = page.locator('.message-success div');

    }
    async validateProductPageLoaded(){
        await expect(this.productContainer).toBeVisible({ timeout: 15000 });
    }

    async selectFirstAvailableSize(){
        await expect(this.sizeOptions.first()).toBeVisible();
        await this.sizeOptions.first().click();
    }

    async selectFirstAvailableColor(){
        await expect(this.colorOptions.first()).toBeVisible();
        await this.colorOptions.first().click();
    }

    async addToCart(){
        await expect(this.addToCartButton).toBeEnabled();
        await this.addToCartButton.click();
    }

    async validateProductAddedToCart() {
        await expect(this.successMessage).toBeVisible();
    }
}
    
