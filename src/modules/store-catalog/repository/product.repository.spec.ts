import { Sequelize } from "sequelize-typescript";
import { Id } from "@/modules/@shared/domain/value-object";
import { ProductRepository } from "@/modules/store-catalog/repository";
import { Product } from "@/modules/store-catalog/domain";
import ProductModel from "./product.model";

describe("Product repository", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  describe("findAll()", () => {
    it("should return all products", async () => {
      await ProductModel.create({
        id: "1",
        name: "product 1",
        description: "desc1",
        salesPrice: 8.11,
      });

      await ProductModel.create({
        id: "2",
        name: "product 2",
        description: "desc2",
        salesPrice: 3.01,
      });

      const repository = new ProductRepository();

      const products = await repository.findAll();

      expect(products.length).toBe(2);
      expect(products[0]).toBeInstanceOf(Product);
    });

    it("should return an empty list of products", async () => {
      const repository = new ProductRepository();

      const products = await repository.findAll();

      expect(products.length).toBe(0);
    });
  });

  describe("findAll()", () => {
    it("should return all products", async () => {
      await ProductModel.create({
        id: "1",
        name: "product 1",
        description: "desc1",
        salesPrice: 8.11,
      });

      await ProductModel.create({
        id: "2",
        name: "product 2",
        description: "desc2",
        salesPrice: 3.01,
      });

      const repository = new ProductRepository();

      const product = await repository.find(new Id("1"));

      expect(product.getName()).toBe("product 1");
    });

    it("should return all products", async () => {
      await ProductModel.create({
        id: "1",
        name: "product 1",
        description: "desc1",
        salesPrice: 8.11,
      });

      await ProductModel.create({
        id: "2",
        name: "product 2",
        description: "desc2",
        salesPrice: 3.01,
      });

      const repository = new ProductRepository();

      await expect(async () => {
        await repository.find(new Id("3"));
      }).rejects.toThrow(new Error("Product with id 3 not found"));
    });
  });
});
