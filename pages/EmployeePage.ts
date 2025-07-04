import { Page } from '@playwright/test';

export class EmployeePage {
  constructor(private page: Page) {}

  async navigateToPIM() {
    await this.page.click('a[href="/web/index.php/pim/viewPimModule"]');
    await this.page.waitForURL(/pim\/viewEmployeeList/);
  }

  async addEmployee(firstName: string, lastName: string) {
    await this.page.click('a[href="/web/index.php/pim/addEmployee"]');
    await this.page.fill('[name="firstName"]', firstName);
    await this.page.fill('[name="lastName"]', lastName);
    await this.page.click('button[type="submit"]');
    await this.page.waitForSelector('h6:has-text("Personal Details")');
  }
}