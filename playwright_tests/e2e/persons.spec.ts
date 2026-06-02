import { test, expect } from '@playwright/test';

const BASE = '/api/persons';

// Resetea el estado antes de cada test para que sean independientes
test.beforeEach(async ({ request }) => {
  await request.post(`${BASE}/reset`);
});

// GET /persons
test('GET /persons → 200', async ({ request }) => {
  const res = await request.get(BASE);
  expect(res.status()).toBe(200);
});

// GET /persons/:id
test('GET /persons/1 → 200 (persona existente)', async ({ request }) => {
  const res = await request.get(`${BASE}/1`);
  expect(res.status()).toBe(200);
});

test('GET /persons/999 → 404 (persona inexistente)', async ({ request }) => {
  const res = await request.get(`${BASE}/999`);
  expect(res.status()).toBe(404);
});

// POST /persons
test('POST /persons → 201 (crear persona)', async ({ request }) => {
  const res = await request.post(BASE, {
    data: {
      name: 'Test User',
      email: 'test@example.com',
      age: 25,
      role: 'user',
    },
  });
  expect(res.status()).toBe(201);
});

// PUT /persons/:id
test('PUT /persons/1 → 200 (actualizar persona existente)', async ({ request }) => {
  const res = await request.put(`${BASE}/1`, {
    data: { age: 30 },
  });
  expect(res.status()).toBe(200);
});

test('PUT /persons/999 → 404 (actualizar persona inexistente)', async ({ request }) => {
  const res = await request.put(`${BASE}/999`, {
    data: { age: 30 },
  });
  expect(res.status()).toBe(404);
});

// DELETE /persons/:id
test('DELETE /persons/1 → 204 (eliminar persona existente)', async ({ request }) => {
  const res = await request.delete(`${BASE}/1`);
  expect(res.status()).toBe(204);
});

test('DELETE /persons/999 → 404 (eliminar persona inexistente)', async ({ request }) => {
  const res = await request.delete(`${BASE}/999`);
  expect(res.status()).toBe(404);
});

// Validación de body
test('GET /persons → retorna un array con objetos de tipo Person', async ({ request }) => {
  const res = await request.get(BASE);
  const body = await res.json();

  expect(Array.isArray(body)).toBeTruthy();

  // Verifica que cada elemento tenga la forma esperada
  for (const person of body) {
    expect(person).toMatchObject({
      id: expect.any(Number),
      name: expect.any(String),
      email: expect.any(String),
      age: expect.any(Number),
      role: expect.stringMatching(/^(admin|user)$/),
      active: expect.any(Boolean),
    });
  }
});

test('GET /persons/1 → retorna la persona con id 1 del seed', async ({ request }) => {
  const res = await request.get(`${BASE}/1`);
  const body = await res.json();

  expect(body).toMatchObject({
    id: 1,
    name: 'Alice Martínez',
    email: 'alice@example.com',
    age: 28,
    role: 'admin',
    active: true,
  });
});

test('GET /persons/999 → body contiene mensaje de error', async ({ request }) => {
  const res = await request.get(`${BASE}/999`);
  const body = await res.json();

  expect(body).toMatchObject({
    message: expect.any(String),
  });
});

// Response time
test('GET /persons → responde en menos de 200ms', async ({ request }) => {
  const start = Date.now();
  await request.get(BASE);
  const elapsed = Date.now() - start;

  expect(elapsed).toBeLessThan(200);
});

test('GET /persons/:id → responde en menos de 200ms', async ({ request }) => {
  const start = Date.now();
  await request.get(`${BASE}/1`);
  const elapsed = Date.now() - start;

  expect(elapsed).toBeLessThan(200);
});
