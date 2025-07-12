import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { LeavePage } from '../../pages/LeavePage';
import { credentials } from '../../utils/testData';

test.skip('Search Leave Requests', async ({ page }) => {
  const login = new LoginPage(page);
  const leavePage = new LeavePage(page);

  await login.goto();
  await login.login(credentials.username, credentials.password);
  await leavePage.navigateToLeaveList();
  await leavePage.searchLeaveRequests();
});