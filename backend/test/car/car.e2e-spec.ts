import { ADMIN_EMAIL, ADMIN_PASSWORD, APP_URL } from '../utils/constants';
import request from 'supertest';

describe('Car (e2e)', () => {
  const app = APP_URL;
  let newCar;
  const newCarModel = `car.${Date.now()}`;
  const newCarLicensePlate = `car.JJJ-78671.${Date.now()}`;
  let newCarRequest;
  let apiToken;
  let userId;

  beforeAll(async () => {
    await request(app)
      .post('/api/v1/auth/email/login')
      .send({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
      .then(({ body }) => {
        apiToken = body.token;
        userId = body.id;
      });

    await request(app)
      .post('/api/v1/cars')
      .auth(apiToken, {
        type: 'bearer',
      })
      .send({
        brand: 'car.Nissan',
        model: newCarModel,
        licensePlate: newCarLicensePlate,
        capacity: 42,
        user: {
          id: userId,
        },
        type: {
          id: 1,
        },
        status: {
          id: 1,
        },
      })
      .then(({ body }) => {
        newCar = body;
      });
  });

  it('Change capacity for car: /api/v1/cars/:id (PATCH)', () => {
    return request(app)
      .patch(`/api/v1/cars/${newCar.id}`)
      .auth(apiToken, {
        type: 'bearer',
      })
      .send({ capacity: 12 })
      .expect(200);
  });

  it('Fail create new car: /api/v1/cars (POST)', () => {
    return request(app)
      .post(`/api/v1/cars`)
      .auth(apiToken, {
        type: 'bearer',
      })
      .send({ type: 'fail-data' })
      .expect(422);
  });

  it('Success create new car: /api/v1/cars (POST)', () => {
    return request(app)
      .post(`/api/v1/cars`)
      .auth(apiToken, {
        type: 'bearer',
      })
      .send({
        brand: 'new-car.Nissan',
        model: `new-car.${Date.now()}`,
        licensePlate: `new-car.JJJ-78671.${Date.now()}`,
        capacity: 42,
        user: {
          id: userId,
        },
        type: {
          id: 1,
        },
        status: {
          id: 1,
        },
      })
      .expect(201)
      .then(({ body }) => {
        newCarRequest = body;
      });
  });

  it('Get list of cars: /api/v1/cars (GET)', () => {
    return request(app)
      .get(`/api/v1/cars`)
      .auth(apiToken, {
        type: 'bearer',
      })
      .expect(200)
      .send()
      .expect(({ body }) => {
        expect(body.data[0].brand).toBeDefined();
        expect(body.data[0].model).toBeDefined();
        expect(body.data[0].licensePlate).toBeDefined();
        expect(body.data[0].capacity).toBeDefined();
        expect(body.data[0].type).toBeDefined();
        expect(body.data[0].status).toBeDefined();
      });
  });

  it('Get car specific by ID: /api/v1/cars (GET)', () => {
    return request(app)
      .get(`/api/v1/cars/${newCarRequest.id}`)
      .auth(apiToken, {
        type: 'bearer',
      })
      .expect(200)
      .send()
      .expect(({ body }) => {
        expect(body.brand).toBeDefined();
        expect(body.model).toBeDefined();
        expect(body.licensePlate).toBeDefined();
        expect(body.capacity).toBeDefined();
        expect(body.type).toBeDefined();
        expect(body.status).toBeDefined();
      });
  });

  afterAll(async () => {
    await request(app).delete(`/api/v1/cars/${newCar.id}`).auth(apiToken, {
      type: 'bearer',
    });

    await request(app)
      .delete(`/api/v1/cars/${newCarRequest.id}`)
      .auth(apiToken, {
        type: 'bearer',
      });
  });
});
