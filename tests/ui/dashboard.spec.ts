import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { credentials } from '../../utils/testData';

test('Dashboard loads after login', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login(credentials.username, credentials.password);
  await expect(page).toHaveURL(/dashboard/);
});