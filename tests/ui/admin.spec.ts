import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { AdminPage } from '../../pages/AdminPage';
import { credentials, generateUserData } from '../../utils/testData';


test.describe('Admin Users CRUD', () => {
  let testUser: { username: string; password: string };
  let updatedUsername: string;
  let username: string;

  test.beforeEach(async ({ page }) => {
    testUser = generateUserData();
    // updatedUsername = `${testUser.username}_updated`;

    const login = new LoginPage(page);
    await login.goto();
    await login.login(credentials.username, credentials.password);
  });

  test('Create admin user', async ({ page }) => {
    const adminPage = new AdminPage(page);
    await adminPage.navigateToSystemUsers();
    username = await adminPage.addUser(testUser.username, testUser.password);
  });

  test('Search for admin user', async ({ page }) => {
    const adminPage = new AdminPage(page);
    await adminPage.navigateToSystemUsers();
    await adminPage.searchUser(username);
  });

  test('Edit admin user', async ({ page }) => {
    updatedUsername = `${testUser.username}_updated`;
    const adminPage = new AdminPage(page);
    await adminPage.navigateToSystemUsers();
    await adminPage.editUser(username, updatedUsername);
  });

  test('Delete admin user', async ({ page }) => {
    const adminPage = new AdminPage(page);
    await adminPage.navigateToSystemUsers();
    await adminPage.deleteUser(updatedUsername);
  });
});