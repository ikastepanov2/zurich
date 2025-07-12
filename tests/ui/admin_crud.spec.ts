import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { AdminPage } from '../../pages/AdminPage';
import { credentials, generateUserData } from '../../utils/testData';

test('Admin CRUD end-to-end', async ({ page }) => {
  const testUser = generateUserData();
  const updatedUsername = `${testUser.username}_updated`;
  const login = new LoginPage(page);
  await login.goto();
  await login.login(credentials.username, credentials.password);

  const adminPage = new AdminPage(page);
  await adminPage.navigateToSystemUsers();

  const username = await adminPage.addUser(testUser.username, testUser.password);
  await expect (adminPage.message).toHaveText('Successfully Saved');

  await adminPage.searchUser(username);

  await adminPage.editUser(username, updatedUsername);
  await expect(adminPage.message).toHaveText("Successfully Updated");

  await adminPage.deleteUser(updatedUsername);
  await expect(adminPage.message).toHaveText("Successfully Deleted");
});
