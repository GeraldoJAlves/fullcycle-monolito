import { Sequelize } from "sequelize-typescript";
import { ProductAdmFacade } from "../facade";
import { ProductModel } from "../repository/product.model";
import ProductAdmFacadeFactory from "./facade.factory"

describe("ProductAdmFacade factory", () => {

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
    const facade = ProductAdmFacadeFactory.create();

    const input = {
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 100,
      stock: 10,
    };

    const output = await facade.addProduct(input)

    expect(output?.id).toBeDefined()

    const productDb = await ProductModel.findOne({
      where: { id: output.id },
    });

    expect(productDb).toBeDefined();
    expect(productDb?.name).toEqual(output.name);
    expect(productDb?.description).toEqual(output.description);
    expect(productDb?.purchasePrice).toEqual(output.purchasePrice);
    expect(productDb?.stock).toEqual(output.stock);
    expect(productDb?.createdAt).toEqual(output.createdAt);
    expect(productDb?.updatedAt).toEqual(output.updatedAt);
  })
})