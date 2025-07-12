import { expect, Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class AdminPage extends BasePage{
  // readonly page: Page;
  readonly AddUserTitle: Locator;
  readonly Drodown: Locator;
  readonly AdminUserRoleItem: Locator;
  readonly StatusItemEnabled: Locator;
  readonly DropdownInputItem: Locator;
  readonly inputFileds: Locator;
  readonly confirmDeleteOption: Locator;


  constructor(page: Page) {
    super(page);
    this.AddUserTitle = page.locator('h6.orangehrm-main-title:has-text("Add User")')
    this.Drodown = page.locator('.oxd-select-text--arrow');
    this.AdminUserRoleItem = page.locator('.oxd-select-dropdown >> text=Admin');
    this.StatusItemEnabled = page.locator('.oxd-select-dropdown >> text=Enabled');
    this.DropdownInputItem = page.locator('div.oxd-select-text-input');
    this.inputFileds = page.locator('form input');
    this.confirmDeleteOption = page.locator('button:has-text("Yes, Delete")');
  }

  async navigateToSystemUsers() {
    await this.page.click('a[href="/web/index.php/admin/viewAdminModule"]');
    await this.page.waitForURL(/admin\/viewSystemUsers/);
  }

  async addUser(username: string, password: string) {
    await this.AddBtn.click();
    await this.AddUserTitle.waitFor();
    // Click the User Role dropdown arrow
    await this.Drodown.nth(0).click();
    // Click the "Admin" option
    await this.AdminUserRoleItem.click();
    // Assert that Admin is selected
    const userRoleText = await this.DropdownInputItem.first().innerText()
    expect(userRoleText).toContain('Admin');

    // Click the Status dropdown arrow
    await this.Drodown.nth(1).click();
    // Click the "Enabled" option
    await this.StatusItemEnabled.click();
    // Assert that Enabled is selected
    const statusText = await this.DropdownInputItem.last().innerText();
    expect(statusText).toContain('Enabled');

    await this.inputFileds.nth(1).fill(username);
    await this.inputFileds.nth(2).fill(password);
    await this.inputFileds.nth(3).fill(password);

    await this.chooseEmployeeName('R');
    await this.SaveBtn.click();
    await this.loadingSpinner.waitFor({state: "hidden"});
    return username;
  }

  async searchUser(username: string) {
    await this.page.locator('.oxd-input.oxd-input--active').last().fill(username);
    await this.page.click('button:has-text("Search")');
    await this.loadingSpinner.waitFor({state:"hidden"});
    await this.page.waitForSelector(`div:has-text("${username}")`, {state:"visible"});
  }

  async editUser(username: string, newUsername: string) {
    await this.searchUser(username);
    await this.editBtn.waitFor({state:"visible"});
    await this.editBtn.click();
    await this.loadingSpinner.waitFor({state:"hidden"});
    await this.page.waitForTimeout(3000);
    await this.inputFileds.nth(1).fill(newUsername);
    await this.SaveBtn.click();
    await this.loadingSpinner.waitFor({ state: 'hidden' });
  }

  async deleteUser(username: string) {
    await this.page.waitForTimeout(3000);
    await this.searchUser(username);
    await this.deleteBtn.waitFor({state:"visible"});
    await this.deleteBtn.click();
    await this.confirmDeleteOption.click();
  }

  async chooseEmployeeName(value: string) {
    // Click into the Employee Name input field
    const employeeInput = this.page.locator('input[placeholder="Type for hints..."]');
    await employeeInput.click();

    // Type any starting character to trigger suggestions
    await employeeInput.fill(value);
    await this.page.waitForTimeout(3000);
    const dropdownListbox = this.page.locator('div[role="listbox"]');
    await dropdownListbox.waitFor(); // Wait until list items are displayed
    const firstSuggestion = dropdownListbox.locator('div[role="option"]').first();
    await firstSuggestion.click();

  }
}