import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "@/modules/store-catalog/repository";
import StoreCatalogFacadeFactory from "./facade.factory";

describe("StoreCatalogFacade factory", () => {
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

  it("should find a product", async () => {
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

    const sut = StoreCatalogFacadeFactory.create();

    const product = await sut.find({ id: "2" });
    expect(product.id).toBe("2");
  });


  it("should find all products", async () => {
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

    const sut = StoreCatalogFacadeFactory.create();

    const response = await sut.findAll({});
    expect(response.products.length).toBe(2);
  });
});
