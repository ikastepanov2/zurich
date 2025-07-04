import { Page } from '@playwright/test';

export class LeavePage {
  constructor(private page: Page) {}

  async navigateToLeaveList() {
    await this.page.click('a[href="/web/index.php/leave/viewLeaveModule"]');
    await this.page.waitForURL(/leave\/viewLeaveList/);
  }

  async searchLeaveRequests() {
    await this.page.click('button:has-text("Search")');
    await this.page.waitForSelector('div.orangehrm-leave-list');
  }
}