import { test, expect } from '@playwright/test';
import { getAuthenticatedApiContext } from '../../utils/api.Auth';
import { AdminApi } from '../../api/AdminApi';
import { generateUserData } from '../../utils/testData';

test.describe('Admin API CRUD', () => {
    let adminApi: AdminApi;
    let userId: number;

    const user = generateUserData();
    const updatedUsername = `${user.username}_updated`;

    test.beforeAll(async () => {
        const apiContext = await getAuthenticatedApiContext();
        adminApi = new AdminApi(apiContext);
    });


    test('CREATE user', async () => {
        userId = await adminApi.createUser(user.username, user.password);
        expect(userId).toBeGreaterThan(0);
    });


    test('READ user', async () => {
        const users = await adminApi.getUser(user.username);

        expect(users.length).toBeGreaterThan(0);
        expect(users[0].userName).toBe(user.username);
    });


    test.skip('UPDATE user', async () => {
        await adminApi.updateUser(userId, { username: updatedUsername });

        const users = await adminApi.getUser(updatedUsername);

        expect(users.length).toBeGreaterThan(0);
        expect(users[0].userName).toBe(updatedUsername);
    });


    test.skip('DELETE user', async () => {
        await adminApi.deleteUser(userId);

        const users = await adminApi.getUser(updatedUsername);
        expect(users.length).toBe(0);
    });
});
