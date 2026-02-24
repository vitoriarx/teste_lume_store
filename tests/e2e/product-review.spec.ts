import { test, expect } from '@playwright/test';

test.describe('Review de produto masculino', () => {

  test('Deve adicionar comentário em produto aleatório do catálogo masculino', async ({ page }) => {

    
    await page.goto('/men/tops-men.html');

    const products = page.locator('.product-item');
    await expect(products.first()).toBeVisible();

    const count = await products.count();
    expect(count).toBeGreaterThan(0);

    const randomIndex = Math.floor(Math.random() * count);

    await products.nth(randomIndex).click();


    await page.getByRole('link', { name: /Reviews/i }).click();


    await page.getByLabel(/Nickname/i).fill('QA Tester');
    await page.getByLabel(/Summary/i).fill('Produto muito bom');

    await page.getByRole('textbox', { name: 'Review*' })
    .fill('Comentário automatizado via Playwright.');

       
    await page.locator('label[title="5 stars"]').click({ force: true });

    await page.getByRole('button', { name: /Submit Review/i }).click();

    await expect(page.locator('text=You submitted your review')).toBeVisible();


    });

});