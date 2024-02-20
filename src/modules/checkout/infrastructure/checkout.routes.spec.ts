import request from "supertest";
import { app, sequelize } from "@/modules/@shared/infrastructure/express";
import { ClientModel } from "@/modules/client-adm/repository";
import { ProductModel } from "@/modules/product-adm/repository";

describe("Product route", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
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
        { name: "ball" },
        { description: "ball" },
        { stock: 2 },
        { purchasePrice: 3 },
        { name: "ball", description: "red", purchasePrice: 0, stock: 10 },
        { name: "ball", description: "red", purchasePrice: 2, stock: 0 },
        { name: "ball", description: "red", purchasePrice: 2, stock: -1 },
        { name: "ball", description: "red", purchasePrice: -1, stock: 10 },
      ];

      for (const input of inputs) {
        const response = await request(app).post("/product").send(input);
        expect(response.status).toBe(400);
      }
    });
  });
});
