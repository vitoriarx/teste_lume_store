import { test, expect } from '@playwright/test';

test.describe('Catálogo masculino', () => {

  test('Adicionar produto aleatório do catálogo masculino ao carrinho', async ({ page }) => {

    
    await page.goto('/men/tops-men.html');


    const products = page.locator('.product-item');

    await expect(products.first()).toBeVisible();

    const count = await products.count();
    expect(count).toBeGreaterThan(0);


    const randomIndex = Math.floor(Math.random() * count);


    await products.nth(randomIndex).click();


    const sizeOptions = page.locator('.swatch-attribute.size .swatch-option');
    if (await sizeOptions.count() > 0) {
      await sizeOptions.first().click();
    }

    const colorOptions = page.locator('.swatch-attribute.color .swatch-option');
    if (await colorOptions.count() > 0) {
      await colorOptions.first().click();
    }

    await page.getByRole('button', { name: /Add to Cart/i }).click();

    await expect(page.locator('.message-success')).toBeVisible();

  });

});