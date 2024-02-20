import request from "supertest";
import { app, sequelize } from "@/modules/@shared/infrastructure/express";
import { ProductModel } from "@/modules/product-adm/repository";
import { Product } from "@/modules/product-adm/domain";
import { Id } from "@/modules/@shared/domain/value-object";

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
        stock: 10,
      });

      expect(response.status).toBe(201);
      expect(response.body.id).toBeDefined();
      expect(response.body.name).toBe("ball");
      expect(response.body.description).toBe("red");
      expect(response.body.stock).toBe(10);
      expect(response.body.purchasePrice).toBe(2.99);
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

  describe("GET /:id/checkstock", () => {
    it("should return the stock of product", async () => {
      const productProps = {
        id: new Id(),
        name: "Product 1",
        description: "Product 1 description",
        purchasePrice: 100,
        stock: 10,
      };

      const product = new Product(productProps);

      await ProductModel.create({
        id: product.getId().getValue(),
        name: product.getName(),
        description: product.getDescription(),
        purchasePrice: product.getPurchasePrice(),
        stock: product.getStock(),
        createdAt: product.getCreatedAt(),
        updatedAt: product.getUpdatedAt(),
      });

      const response = await request(app)
        .get(`/product/${product.getId().getValue()}/check-stock`)
        .send();

      expect(response.status).toBe(200);

      expect(response.body).toEqual({
        id: product.getId().getValue(),
        stock: product.getStock(),
      });
    });

    it("should return 404 if the product does not exist", async () => {
      const response = await request(app)
        .get(`/product/898908908098/check-stock`)
        .send();

      expect(response.status).toBe(404);
    });
  });
});
