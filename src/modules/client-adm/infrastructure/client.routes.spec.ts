import request from "supertest";
import { app, sequelize } from "@/modules/@shared/infrastructure/express";

describe("Client route", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe("POST /", () => {
    it("should return 201 if a valid product is provided", async () => {
      const response = await request(app).post("/client").send({
        name: 'john',
        email: 'john@email.com',
        street: 'street 1',
        number: '90',
        complement: 'compl',
        city: 'city A',
        state: 'OH',
        zipCode: '9078',
      });

      expect(response.status).toBe(201);
    });

    it("should return 400 if an invalid body is provided", async () => {
      const inputs = [{},
        {
          name: 'john',
          email: 'john@email.com',
          street: 'street 1',
        },
        {
          name: 'john',
          city: 'city A',
          state: 'OH',
          zipCode: '9078',
        },
        {
          name: 'john',
          email: 'john@email.com',
          street: 'street 1',
          number: '90',
        }];

      for (const input of inputs) {
        const response = await request(app).post("/client").send(input);
        expect(response.status).toBe(400);
      }
    });
  });
});
