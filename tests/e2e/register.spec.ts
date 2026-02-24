import { test, expect } from '@playwright/test';

test.describe('Cadastro de usuário', () => {

  test('Deve criar conta simulando validação de captcha', async ({ page }) => {

    
    await page.route('**/customer/account/createpost/**', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'text/html',
        body: `
          <html>
            <body>
              <div class="message-success">
                Thank you for registering.
              </div>
            </body>
          </html>
        `
      });
    });

    await page.goto('/customer/account/create/');

  
    await page.getByRole('textbox', { name: 'First Name*' }).fill('QA');
    await page.getByRole('textbox', { name: 'Last Name*' }).fill('Automation');

    await page.getByRole('textbox', { name: 'Email*' })
    .fill(`qa${Date.now()}@test.com`);

    await page.getByRole('textbox', { name: 'Password*' })
    .fill('Qa123456!');

    await page.getByRole('textbox', { name: 'Confirm Password *' })
    .fill('Qa123456!');

    
    await page.getByRole('button', { name: /Create an Account/i }).click();

    
    await expect(page.locator('.message-success')).toBeVisible();

  });

});