import { Sequelize } from "sequelize-typescript";
import { Id } from "@/modules/@shared/domain/value-object";
import { Product } from "@/modules/product-adm/domain";
import ProductRepository from "./product.repository";
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

  it("should create a product", async () => {
    const productProps = {
      id: new Id("1"),
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 100,
      stock: 10,
    };
    const product = new Product(productProps);
    const productRepository = new ProductRepository();
    await productRepository.add(product);

    const productDb = await ProductModel.findOne({
      where: { id: product.getId().getValue() },
    });

    expect(productDb).toBeDefined();
    expect(productDb?.id).toEqual(product.getId().getValue());
    expect(productDb?.name).toEqual(product.getName());
    expect(productDb?.description).toEqual(product.getDescription());
    expect(productDb?.purchasePrice).toEqual(product.getPurchasePrice());
    expect(productDb?.stock).toEqual(product.getStock());
  });

  it("should find a product", async () => {
    const productProps = {
      id: new Id("1"),
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

    const productRepository = new ProductRepository();

    const productOutput = await productRepository.find(product.getId());

    expect(productOutput).toEqual(product);
  });

  it("should return error when product not found", async () => {
    const id = new Id("Id not found");
    const productRepository = new ProductRepository();

    await expect(async () => {
      await productRepository.find(id);
    }).rejects.toThrow(new Error(`Product with id ${id.getValue()} not found`));
  });
});
