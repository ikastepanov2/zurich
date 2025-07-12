import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class EmployeePage extends BasePage {

  readonly firstNameFiled: Locator;
  readonly middleNameField: Locator;
  readonly lastNameField: Locator;
  readonly employeeIdField: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameFiled = page.locator('input[name="firstName"]');
    this.middleNameField = page.locator('input[name="middleName"]');
    this.lastNameField = page.locator('input[name="lastName"]');
    this.employeeIdField = page.locator('input[name="firstName"]');
    this.firstNameFiled = page.locator('input[name="firstName"]');
  }

  async navigateToPIM() {
    await this.page.click('a[href="/web/index.php/pim/viewPimModule"]');
    await this.page.waitForURL(/pim\/viewEmployeeList/);
  }

  async addEmployee(firstName: string, middleName: string, lastName: string, employeeId: string) {
    await this.AddBtn.click();
    await this.firstNameFiled.fill(firstName);
    await this.middleNameField.fill(middleName)
    await this.lastNameField.fill(lastName);
    await this.employeeIdField.fill(employeeId);
    await this.SaveBtn.click();
    await this.loadingSpinner.waitFor({ state: "hidden" });
  }

  async deleteEmployee(updatedFirstName: any) {
    throw new Error('Method not implemented.');
  }
  async editEmployee(employeeId: string, updatedEmployeeId: string) {
    await this.searchEmployee(employeeId);
    await this.editBtn.waitFor({ state: "visible" });
    await this.editBtn.click();
    await this.loadingSpinner.waitFor({ state: "hidden" });
    await this.page.waitForTimeout(3000);
    await this.employeeIdField.fill(updatedEmployeeId);
    await this.SaveBtn.click();
    await this.loadingSpinner.waitFor({ state: 'hidden' });
  }
  async searchEmployee(employeeId: string) {
    this.navigateToPIM();
    await this.loadingSpinner.waitFor({ state: "hidden" });
    await this.page.locator('form>div>div>div>div>div>.oxd-input.oxd-input--active').fill(employeeId);
    await this.page.click('button:has-text("Search")');
    await this.loadingSpinner.waitFor({ state: "hidden" });
    await this.page.waitForSelector(`div:has-text("${employeeId}")`, { state: "visible" });
  }
}