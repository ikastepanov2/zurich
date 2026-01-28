import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class EmployeePage extends BasePage {

  readonly FirstNameFiled: Locator;
  readonly MiddleNameField: Locator;
  readonly LastNameField: Locator;
  readonly SearchEmployeeIdField: Locator;

  constructor(page: Page) {
    super(page);
    this.FirstNameFiled = page.locator('input[name="firstName"]');
    this.MiddleNameField = page.locator('input[name="middleName"]');
    this.LastNameField = page.locator('input[name="lastName"]');
    this.SearchEmployeeIdField = page.locator('form>div>div>div>div>div>.oxd-input.oxd-input--active');
    this.FirstNameFiled = page.locator('input[name="firstName"]');
  }

  async navigateToPIM() {
    await this.page.click('a[href="/web/index.php/pim/viewPimModule"]');
    await this.page.waitForURL(/pim\/viewEmployeeList/);
  }

  async addEmployee(firstName: string, middleName: string, lastName: string, employeeId: string) {
    await this.AddBtn.click();
    await this.FirstNameFiled.fill(firstName);
    await this.MiddleNameField.fill(middleName)
    await this.LastNameField.fill(lastName);
    // await this.SearchEmployeeIdField.fill(employeeId);
    await this.SaveBtn.click();
    await this.LoadingSpinner.waitFor({ state: "hidden" });
  }

  async deleteEmployee(updatedFirstName: any) {
    throw new Error('Method not implemented.');
  }
  async editEmployee(employeeId: string, updatedEmployeeId: string) {
    await this.searchEmployee(employeeId);
    await this.EditBtn.waitFor({ state: "visible" });
    await this.EditBtn.click();
    await this.LoadingSpinner.waitFor({ state: "hidden" });
    await this.page.waitForTimeout(3000);
    await this.SearchEmployeeIdField.fill(updatedEmployeeId);
    await this.SaveBtn.click();
    await this.LoadingSpinner.waitFor({ state: 'hidden' });
  }
  async searchEmployee(employeeId: string) {
    this.navigateToPIM();
    await this.LoadingSpinner.waitFor({ state: "hidden" });
    // await this..fill(employeeId);
    await this.SearchEmployeeIdField.waitFor({ state: "attached" })
    await this.SearchEmployeeIdField.fill(employeeId);
    await this.SearchButton.click();
    await this.LoadingSpinner.waitFor({ state: "hidden" });
    await this.page.waitForTimeout(1000);
  }

  async isEmployeePresent(username: string): Promise<boolean> {
    return await this.userRow(username).first().isVisible();
  }
}