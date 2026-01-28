import { request, chromium, APIRequestContext } from '@playwright/test';
import { credentials } from './testData';

export async function getAuthenticatedApiContext(): Promise<APIRequestContext> {
  // 1️⃣ Login via browser (UI)
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://opensource-demo.orangehrmlive.com/');
  await page.fill('input[name="username"]', credentials.username);
  await page.fill('input[name="password"]', credentials.password);
  await page.click('button[type="submit"]');

  await page.waitForURL('**/dashboard/**');

  // 2️⃣ Extract cookies
  const cookies = await context.cookies();

  // 3️⃣ Create API context with those cookies
  const apiContext = await request.newContext({
    baseURL: 'https://opensource-demo.orangehrmlive.com',
    extraHTTPHeaders: {
      cookie: cookies.map(c => `${c.name}=${c.value}`).join('; ')
    }
  });

  await browser.close();
  return apiContext;
}
