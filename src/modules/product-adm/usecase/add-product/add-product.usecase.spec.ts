import { ProductRepositorySpy } from "../test";
import AddProductUsecase from "./add-product.usecase";

const makeSut = () => {
  const productRepositorySpy = new ProductRepositorySpy();
  const sut = new AddProductUsecase(productRepositorySpy);

  return {
    productRepositorySpy,
    sut,
  };
};

describe("AddProduct usecase", () => {
  it("should add a product", async () => {
    const { sut, productRepositorySpy } = makeSut();

    const input = {
      name: "ball",
      description: "simple ball",
      purchasePrice: 4.99,
      stock: 3,
    };

    const response = await sut.execute(input);

    expect(response.name).toBe(input.name);
    expect(response.description).toBe(input.description);
    expect(response.purchasePrice).toBe(input.purchasePrice);
    expect(response.stock).toBe(input.stock);

    expect(productRepositorySpy.inputAdd?.getId().getValue()).toBe(response.id);
    expect(productRepositorySpy.inputAdd?.getName()).toBe(response.name);
    expect(productRepositorySpy.inputAdd?.getDescription()).toBe(
      response.description
    );
    expect(productRepositorySpy.inputAdd?.getPurchasePrice()).toBe(
      response.purchasePrice
    );
    expect(productRepositorySpy.inputAdd?.getStock()).toBe(response.stock);
    expect(productRepositorySpy.inputAdd?.getCreatedAt()).toBe(
      response.createdAt
    );
    expect(productRepositorySpy.inputAdd?.getUpdatedAt()).toBe(
      response.updatedAt
    );
  });

  it("should throw if productRepository throws", () => {
    const { sut, productRepositorySpy } = makeSut();

    const input = {
      name: "ball",
      description: "simple ball",
      purchasePrice: 4.99,
      stock: 3,
    };

    jest
      .spyOn(productRepositorySpy, "add")
      .mockRejectedValueOnce(new Error("Fail to connect"));

    expect(async () => {
      await sut.execute(input);
    }).rejects.toThrow("Fail to connect");
  });
});
