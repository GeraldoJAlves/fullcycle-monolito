import request from "supertest";
import { app, sequelize } from "@/modules/@shared/infrastructure/express";
import { ClientModel } from "@/modules/client-adm/repository";
import { ProductModel } from "@/modules/product-adm/repository";

describe("Checkout route", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    try {
      await sequelize.close();
    } catch {}
  });

  describe("POST /", () => {
    it("should return 201 if a valid product and client is provided", async () => {
      const clientProps = {
        id: "1",
        name: "Alexander",
        email: "aa@email.com",
        street: "street 2",
        number: "30",
        complement: "none",
        city: "city M",
        state: "WC",
        zipCode: "999-99",
        createdAt: new Date(),
        updatedAt: new Date("2020-09-01 04:00:00"),
      };

      await ClientModel.create(clientProps);

      const productProps = {
        id: "p1",
        name: "Product 1",
        description: "Product 1 description",
        purchasePrice: 120,
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await ProductModel.create(productProps);

      const response = await request(app)
        .post("/checkout")
        .send({
          clientId: clientProps.id,
          products: [{ productId: "p1" }],
        });

      expect(response.status).toBe(201);
    });

    it("should return 400 if an invalid body is provided", async () => {
      const inputs = [
        {},
        { clientId: "2" },
      ];

      for (const input of inputs) {
        const response = await request(app).post("/checkout").send(input);
        expect(response.status).toBe(400);
      }
    });

    it("should return 500 if provide an invalid productId", async () => {
      const clientProps = {
        id: "1",
        name: "Alexander",
        email: "aa@email.com",
        street: "street 2",
        number: "30",
        complement: "none",
        city: "city M",
        state: "WC",
        zipCode: "999-99",
        createdAt: new Date(),
        updatedAt: new Date("2020-09-01 04:00:00"),
      };

      await ClientModel.create(clientProps);

      const productProps = {
        id: "p1",
        name: "Product 1",
        description: "Product 1 description",
        purchasePrice: 120,
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await ProductModel.create(productProps);

      const response = await request(app)
        .post("/checkout")
        .send({
          clientId: clientProps.id,
          products: [{ productId: "" }],
        });

      expect(response.status).toBe(500);
    });
  });
});
