import { test, expect, request } from '@playwright/test';

const baseURL = 'https://opensource-demo.orangehrmlive.com';

// Placeholder API examples — should be replaced with real endpoints when available
test('Get Employee List', async () => {
  const req = await request.newContext();
  const res = await req.get(`${baseURL}/api/employees`);
  expect(res.status()).toBe(200);
});

test('Create Employee - API', async () => {
  const req = await request.newContext();
  const res = await req.post(`${baseURL}/api/employees`, {
    data: {
      firstName: 'Jane',
      lastName: 'Smith'
    }
  });
  expect(res.status()).toBe(201);
});