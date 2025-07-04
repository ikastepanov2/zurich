import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { EmployeePage } from '../../pages/EmployeePage';
import { credentials, employee } from '../../utils/testData';

test('Add New Employee', async ({ page }) => {
  const login = new LoginPage(page);
  const employeePage = new EmployeePage(page);

  await login.goto();
  await login.login(credentials.username, credentials.password);
  await employeePage.navigateToPIM();
  await employeePage.addEmployee(employee.firstName, employee.lastName);
});