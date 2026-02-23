import { Page } from '@playwright/test';

export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(path: string) {
    const response = await this.page.goto(path, {
      waitUntil: 'domcontentloaded', 
      timeout: 30000,
    });

    if (!response || !response.ok()) {
      throw new Error(`Falha ao navegar para ${path}`);
    }
  }
}