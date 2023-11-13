import { ADMIN_EMAIL, ADMIN_PASSWORD, APP_URL } from '../utils/constants';
import request from 'supertest';

describe('Type fuel (e2e)', () => {
  const app = APP_URL;
  let newTypeFuel;
  let newTypeFuelAdmin;
  const newTypeFuelName = `type-fuel.${Date.now()}`;
  const newTypeFuelPrice = 7.5;
  let apiToken;

  beforeAll(async () => {
    await request(app)
      .post('/api/v1/auth/email/login')
      .send({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
      .then(({ body }) => {
        apiToken = body.token;
      });

    await request(app)
      .post('/api/v1/type-fuel')
      .auth(apiToken, {
        type: 'bearer',
      })
      .send({
        name: newTypeFuelName,
        price: newTypeFuelPrice,
      })
      .then(({ body }) => {
        newTypeFuel = body;
      });
  });

  it('Change price for type fuel: /api/v1/type-fuel/:id (PATCH)', () => {
    return request(app)
      .patch(`/api/v1/type-fuel/${newTypeFuel.id}`)
      .auth(apiToken, {
        type: 'bearer',
      })
      .send({ price: 8.2 })
      .expect(200);
  });

  it('Fail create new type fuel by admin: /api/v1/type-fuel (POST)', () => {
    return request(app)
      .post(`/api/v1/type-fuel`)
      .auth(apiToken, {
        type: 'bearer',
      })
      .send({ type: 'fail-data' })
      .expect(422);
  });

  it('Success create new type fuel by admin: /api/v1/type-fuel (POST)', () => {
    return request(app)
      .post(`/api/v1/type-fuel`)
      .auth(apiToken, {
        type: 'bearer',
      })
      .send({
        name: `type-fuel-admin.${Date.now()}`,
        price: 7.5,
      })
      .expect(201)
      .then(({ body }) => {
        newTypeFuelAdmin = body;
      });
  });

  it('Get list of type fuels: /api/v1/type-fuel (GET)', () => {
    return request(app)
      .get(`/api/v1/type-fuel`)
      .auth(apiToken, {
        type: 'bearer',
      })
      .expect(200)
      .send()
      .expect(({ body }) => {
        expect(body.data[0].name).toBeDefined();
        expect(body.data[0].price).toBeDefined();
      });
  });

  it('Get type fuel specific by ID: /api/v1/type-fuel (GET)', () => {
    return request(app)
      .get(`/api/v1/type-fuel/${newTypeFuel.id}`)
      .auth(apiToken, {
        type: 'bearer',
      })
      .expect(200)
      .send()
      .expect(({ body }) => {
        expect(body.name).toBeDefined();
        expect(body.price).toBeDefined();
      });
  });

  afterAll(async () => {
    await request(app)
      .delete(`/api/v1/type-fuel/${newTypeFuel.id}`)
      .auth(apiToken, {
        type: 'bearer',
      });

    await request(app)
      .delete(`/api/v1/type-fuel/${newTypeFuelAdmin.id}`)
      .auth(apiToken, {
        type: 'bearer',
      });
  });
});
