import { test, expect, request } from '@playwright/test';

const baseURL = 'https://opensource-demo.orangehrmlive.com';

// Pseudo API endpoint examples (adjust depending on actual API availability)
test('Login API - Valid Credentials', async () => {
  const req = await request.newContext();
  const res = await req.post(`${baseURL}/api/login`, {
    data: {
      username: 'Admin',
      password: 'admin123'
    }
  });
  expect(res.ok()).toBeTruthy();
});