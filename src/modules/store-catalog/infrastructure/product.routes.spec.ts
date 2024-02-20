import request from "supertest";
import { Id } from "@/modules/@shared/domain/value-object";
import { app, sequelize } from "@/modules/@shared/infrastructure/express";
import { ProductModel } from "@/modules/product-adm/repository";
import { Product } from "@/modules/product-adm/domain";

describe("Product route", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });


  describe("GET /:id", () => {
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
        .get(`/product/${product.getId().getValue()}`)
        .send();

      expect(response.status).toBe(200);

      expect(response.body).toEqual({
        id: product.getId().getValue(),
        name: product.getName(),
        description: product.getDescription(),
        salesPrice: product.getPurchasePrice(),
      });
    });

    it("should return 404 if the product does not exist", async () => {
      const response = await request(app)
        .get(`/product/898908908098`)
        .send();

      expect(response.status).toBe(404);
    });
  });
});
