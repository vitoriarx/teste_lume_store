import {expect, Page, Locator} from '@playwright/test';
import {BasePage} from './base.page';

export class CartPage extends BasePage{
    private readonly cartIcon: Locator;
    private readonly proceedToCheckoutButton: Locator;

    constructor(page: Page){
        super(page);

        this.cartIcon = page.locator('.showcart');
        this.proceedToCheckoutButton = page.locator('.action.primary.checkout'); 
    }

    async openMiniCart(){
        await expect(this.cartIcon).toBeVisible();
        await this.cartIcon.click();
    }

    async proceedToCheckout(){
        await expect(this.proceedToCheckoutButton).toBeVisible();
        await this.proceedToCheckoutButton.click();
    }
}