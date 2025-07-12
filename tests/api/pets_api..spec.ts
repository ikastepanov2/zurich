import { test, expect, request } from '@playwright/test';

test.describe('Pet API Tests', () => {
  let apiContext;
  const pet = {
    id: Date.now(),
    name: 'Fluffy',
    photoUrls: ['../../utils/Image1.png'],
    status: 'available',
  };

  test.beforeAll(async ({ playwright }) => {
    apiContext = await request.newContext({
      baseURL: 'https://petstore.swagger.io/v2',
    });
  });

  test('Create a new pet [POST /pet]', async () => {
    const response = await apiContext.post('/pet', {
      data: pet,
    });

    console.log('Status:', response.status());
    console.log('Body:', await response.text());

    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    expect(body.id).toBe(pet.id);
    expect(body.name).toBe(pet.name);
    expect(body.status).toBe(pet.status);
  });

  test('Get the pet by ID [GET /pet/{petId}]', async () => {
    const response = await apiContext.get(`/pet/${pet.id}`);
    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    expect(body.id).toBe(pet.id);
    expect(body.name).toBe('Fluffy');
  });

  test('Update the pet [PUT /pet]', async () => {
    const updatedPet = { ...pet, name: 'Snowball' };

    const response = await apiContext.put('/pet', {
      data: updatedPet,
    });
    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    expect(body.name).toBe('Snowball');
  });

  test('Find pets by status [GET /pet/findByStatus]', async () => {
    const response = await apiContext.get('/pet/findByStatus', {
      params: { status: 'available' },
    });
    expect(response.ok()).toBeTruthy();

    const pets = await response.json();
    expect(Array.isArray(pets)).toBe(true);
    expect(pets.some(p => p.id === pet.id)).toBe(true);
  });

  test('Delete the pet [DELETE /pet/{petId}]', async () => {
    const response = await apiContext.delete(`/pet/${pet.id}`);
    expect(response.ok()).toBeTruthy();

    // Verify deletion
    const getResponse = await apiContext.get(`/pet/${pet.id}`);
    expect(getResponse.status()).toBe(404);
  });
});
