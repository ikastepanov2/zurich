import { Page } from '@playwright/test';
export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/web/index.php/auth/login');
  }

  async login(username: string, password: string) {
    await this.page.fill('[name="username"]', username);
    await this.page.fill('[name="password"]', password);
    await this.page.click('button[type="submit"]');
  }

  async assertLoginSuccessful() {
    await this.page.waitForSelector('nav[aria-label="Topbar Menu"]');
  }
}