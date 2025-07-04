import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { credentials } from '../../utils/testData';

test.describe('Login Tests', () => {
  test('Valid Login', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(credentials.username, credentials.password);
    await login.assertLoginSuccessful();
  });

  test('Invalid Login - Wrong Password', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(credentials.username, 'wrongpass');
    await expect(page.locator('.oxd-alert-content-text')).toContainText('Invalid');
  });
});