import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "./product.model";
import { Id } from "@/modules/@shared/domain/value-object";
import { Product } from "@/modules/product-adm/domain";
import ProductRepository from "./product.repository";

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
    expect(productDb?.getDataValue('id')).toEqual(product.getId().getValue());
    expect(productDb?.getDataValue('name')).toEqual(product.getName());
    expect(productDb?.getDataValue('description')).toEqual(product.getDescription());
    expect(productDb?.getDataValue('purchasePrice')).toEqual(product.getPurchasePrice());
    expect(productDb?.getDataValue('stock')).toEqual(product.getStock());
  });
});
