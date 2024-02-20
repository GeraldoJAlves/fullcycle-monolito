import { app, sequelize } from "@/modules/@shared/infrastructure/express";
import request from "supertest";

describe("Product route", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe("POST /", () => {
    it("should return 201 if a valid product is provided", async () => {

      const response = await request(app).post("/product").send({
        name: "ball",
        description: "red",
        purchasePrice: 2.99,
        stock: 10
      });

      expect(response.status).toBe(201);
      expect(response.body.id).toBeDefined();
      expect(response.body.name).toBe("ball");
      expect(response.body.description).toBe("red");
      expect(response.body.stock).toBe(10);
      expect(response.body.purchasePrice).toBe(2.99);
    });
  });
});
