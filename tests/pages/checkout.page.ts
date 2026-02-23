import { expect, Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { CheckoutData } from '../utils/faker-data';

export class CheckoutPage extends BasePage {

  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly emailInput: Locator;
  private readonly streetInput: Locator;
  private readonly cityInput: Locator;
  private readonly stateSelect: Locator;
  private readonly zipCodeInput: Locator;
  private readonly phoneInput: Locator;
  private readonly shippingMethodRadio: Locator;
  private readonly nextButton: Locator;
  private readonly shippingMethods: Locator;

  constructor(page: Page) {
    super(page);

    const shippingForm = page.locator('.form-shipping-address');

    this.emailInput = page.locator('#customer-email').first();

    this.firstNameInput = shippingForm.locator('input[name="firstname"]');
    this.lastNameInput = shippingForm.locator('input[name="lastname"]');
    this.streetInput = shippingForm.locator('input[name="street[0]"]');
    this.cityInput = shippingForm.locator('input[name="city"]');
    this.stateSelect = shippingForm.locator('select[name="region_id"]');
    this.zipCodeInput = shippingForm.locator('input[name="postcode"]');
    this.phoneInput = shippingForm.locator('input[name="telephone"]');

    this.shippingMethodRadio = page.locator('input[type="radio"]');
    this.nextButton = page.locator('button.continue');

    this.shippingMethods = page.getByRole('radio');
  }

  async validateCheckoutPageLoaded() {
    await expect(this.firstNameInput).toBeVisible({ timeout: 20000 });
  }

  async fillShippingInformation(data: CheckoutData) {

    await expect(
        this.page.locator('.checkout-shipping-address')
    ).toBeVisible({ timeout: 20000 });

    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);

    await this.stateSelect.selectOption({ label: data.state });

    // 🔥 Espera o campo ser recriado e ficar editável
    await expect(this.zipCodeInput).toBeEditable({ timeout: 15000 });

    await this.zipCodeInput.fill(data.zipCode);
    await this.zipCodeInput.press('Tab');

    await expect(this.cityInput).toBeEditable();
    await this.cityInput.fill(data.city);

    await this.streetInput.fill(data.street);
    await this.phoneInput.fill(data.phone);
    await this.emailInput.fill(data.email);
}   

  async selectShippingMethod() {
    await expect(this.shippingMethodRadio.first()).toBeVisible({ timeout: 20000 });
    await this.shippingMethodRadio.first().check();
  }

  async continueToPayment() {
    await expect(this.nextButton).toBeEnabled({ timeout: 20000 });
    await this.nextButton.click();
  }

  async validatePlaceOrderDisabled() {
    const placeOrderButton = this.page.locator('button.action.primary.checkout');

    await expect(placeOrderButton).toBeVisible();
    await expect(placeOrderButton).toBeDisabled();
  }

  async changeZipCode(newZip: string) {
    const estimateRequest = this.page.waitForResponse(response =>
      response.url().includes('/estimate-shipping-methods') &&
      response.request().method() === 'POST'
    );

    await this.zipCodeInput.fill('');
    await this.zipCodeInput.fill(newZip);
    await this.zipCodeInput.blur();

    await estimateRequest;

    // 🔥 Espera os radios reaparecerem após re-render
    await expect(this.page.getByRole('radio').first()).toBeVisible();
  }

  async validateShippingRecalculated() {
    await expect(this.shippingMethodRadio.first()).toBeVisible();
    await expect(this.nextButton).toBeEnabled();
  }

    async validateShippingStillSelected() {
    const firstMethod = this.page.getByRole('radio').first();

    await expect(firstMethod).toBeVisible();
    await expect(firstMethod).toBeChecked();
    await expect(this.nextButton).toBeEnabled();
  }

}


  

  