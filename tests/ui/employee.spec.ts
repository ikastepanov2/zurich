import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { EmployeePage } from '../../pages/EmployeePage';
import { credentials, generateUserData } from '../../utils/testData';

test.describe.configure({ mode: 'serial' }); // ensures tests run in order

test.describe('Employee CRUD', () => {
  let page: Page;
  let login: LoginPage;
  let employeePage: EmployeePage;

  const testData = generateUserData();
  const updatedEmployeeId = `${testData.employeeId}_updated`;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    login = new LoginPage(page);
    employeePage = new EmployeePage(page);

    await login.goto();
    await login.login(credentials.username, credentials.password);
    await employeePage.navigateToPIM();
  });

  test('CREATE employee', async () => {
    await employeePage.addEmployee(
      testData.firstName,
      testData.middleName,
      testData.lastName,
      testData.employeeId
    );
    await expect(employeePage.Message).toHaveText('Successfully Saved');
  });

  test('READ employee', async () => {
    await employeePage.searchEmployee(testData.employeeId);
    const isPresent = await employeePage.isEmployeePresent(testData.employeeId);
    expect(isPresent).toBe(true);
  });

  test('UPDATE employee', async () => {
    await employeePage.editEmployee(testData.employeeId, updatedEmployeeId);
    await expect(employeePage.Message).toHaveText("Successfully Updated");

    await employeePage.searchEmployee(updatedEmployeeId);
    const isUpdated = await employeePage.isEmployeePresent(updatedEmployeeId);
    expect(isUpdated).toBe(true);
  });

  test('DELETE employee', async () => {
    await employeePage.deleteEmployee(updatedEmployeeId);
    await expect(employeePage.Message).toHaveText("Successfully Deleted");

    await employeePage.searchEmployee(updatedEmployeeId);
    const isDeleted = await employeePage.isEmployeePresent(updatedEmployeeId);
    expect(isDeleted).toBe(false);
  });

    test.afterAll(async () => {
      await page.context().close();
    });
});
