import { test, expect, Browser, Page } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { AdminPage } from '../../pages/AdminPage';
import { credentials, generateUserData } from '../../utils/testData';

let page: Page;
let adminPage: AdminPage;

const testUser = generateUserData();
let createdUsername: string;
let updatedUsername: string;


test.describe('Admin CRUD - System Users', () => {

  test.beforeAll(async ({ browser }: { browser: Browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(credentials.username, credentials.password);

    adminPage = new AdminPage(page);
    await adminPage.navigateToSystemUsers();
  });

  test('CREATE user', async () => {
    createdUsername = await adminPage.addUser(
      testUser.username,
      testUser.password
    );

    await expect(adminPage.Message).toHaveText('Successfully Saved');
    await adminPage.searchUser(createdUsername);
    await expect(await adminPage.isUserPresent(createdUsername)).toBeTruthy();
  });

  test('READ user', async () => {
    await adminPage.searchUser(createdUsername);
    expect(await adminPage.isUserPresent(createdUsername)).toBe(true);
  });

  test('UPDATE user', async () => {
    updatedUsername = `${createdUsername}_updated`;

    await adminPage.editUser(createdUsername, updatedUsername);
    await expect(adminPage.Message).toHaveText('Successfully Updated');

    await adminPage.searchUser(updatedUsername);
    expect(await adminPage.isUserPresent(updatedUsername)).toBe(true);
  });

  test('DELETE user', async () => {
    await adminPage.deleteUser(updatedUsername);
    await expect(adminPage.Message.first()).toHaveText('Successfully Deleted');

    await adminPage.searchUser(updatedUsername);
    await expect(adminPage.Message.last()).toHaveText('No Records Found');
  });

  test.afterAll(async () => {
    await page.context().close();
  });
});