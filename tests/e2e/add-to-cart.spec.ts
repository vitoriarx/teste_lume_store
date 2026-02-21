import { test } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { SearchPage } from '../pages/search.page';
import { ProductPage } from '../pages/product.page';

test.describe('Add To Cart Flow', () => {

    test('should add product to cart successfully', async ({ page }) => {

        const home = new HomePage(page);
        const search = new SearchPage(page);
        const product = new ProductPage(page);

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

    });
});