import {test} from '@playwright/test';
import {HomePage} from '../pages/home.page';
import {SearchPage} from '../pages/search.page';
import {ProductPage} from '../pages/product.page';
import {CartPage} from '../pages/cart.page';
import {CheckoutPage} from '../pages/checkout.page';
import {DataFactory} from '../utils/faker-data';

test.describe('Finalização de compra', () => {
    test('deve finalizar a compra com sucesso', async ({page}) => {
        const home = new HomePage(page);
        const search = new SearchPage(page);
        const product = new ProductPage(page);
        const cart = new CartPage(page);
        const checkout = new CheckoutPage(page);

        const fakeData = DataFactory.generateCheckoutData();

        await home.navigate('/');

        await Promise.all([
            search.waitForSearchResponse(),
            home.searchForProduct('shirt')
        ]);

        await search.validateSearchUrl('shirt');
        await search.validateSearchResults();
        await search.clickLastProduct();

        await product.selectFirstAvailableSize();
        await product.selectFirstAvailableColor();
        await product.addToCart();
        await product.validateProductAddedToCart();

        await cart.openMiniCart();
        await cart.proceedToCheckout();

        await checkout.validateCheckoutPageLoaded();
        await checkout.fillShippingInformation(fakeData);
        await checkout.selectShippingMethod();
        await checkout.continueToPayment();
    });

    test('Deve recalcular shipping ao alterar ZIP após seleção', async ({ page }) => {

        const home = new HomePage(page);
        const search = new SearchPage(page);
        const product = new ProductPage(page);
        const cart = new CartPage(page);
        const checkout = new CheckoutPage(page);

        const fakeData = DataFactory.generateCheckoutData();

        await home.navigate('/');

        await Promise.all([
            search.waitForSearchResponse(),
            home.searchForProduct('shirt')
        ]);

        await search.clickLastProduct();
        await product.selectFirstAvailableSize();
        await product.selectFirstAvailableColor();
        await product.addToCart();

        await cart.openMiniCart();
        await cart.proceedToCheckout();

        await checkout.fillShippingInformation(fakeData);
        await checkout.selectShippingMethod();

        // Alterar ZIP depois de selecionar shipping
        await checkout.changeZipCode('90210');

        // Validar que houve revalidação
        await checkout.validateShippingStillSelected();
        });

        
                
});


