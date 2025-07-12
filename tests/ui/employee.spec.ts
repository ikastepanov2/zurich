import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { EmployeePage } from '../../pages/EmployeePage';
import { credentials, generateUserData } from '../../utils/testData';

test('Employee CRUD end-to-end', async ({ page }) => {
  const login = new LoginPage(page);
  const employeePage = new EmployeePage(page);
  const testData = generateUserData();
  const updatedEmployeeId = `${testData.employeeId}_updated`;

  await login.goto();
  await login.login(credentials.username, credentials.password);
  await employeePage.navigateToPIM();

  await employeePage.addEmployee(testData.firstName, testData.middleName, testData.lastName, testData.employeeId);
  await expect(employeePage.message).toHaveText('Successfully Saved');

  await employeePage.searchEmployee(testData.employeeId);

  await employeePage.editEmployee(testData.employeeId, updatedEmployeeId);
  await expect(employeePage.message).toHaveText("Successfully Updated");

  // await employeePage.deleteEmployee(updatedFirstName);
  // await expect(employeePage.message).toHaveText("Successfully Deleted");
});