import { ProductRepositorySpy } from "../test";
import CheckStockUsecase from "./check-stock.usecase";

const makeSut = () => {
  const productRepositorySpy = new ProductRepositorySpy();
  const sut = new CheckStockUsecase(productRepositorySpy);

  return {
    productRepositorySpy,
    sut,
  };
};

describe("CheckStock usecase", () => {
  it("should create a product", async () => {
    const { sut, productRepositorySpy } = makeSut();

    const input = {
      id: productRepositorySpy.outputFind.getId().getValue(),
    };

    const response = await sut.execute(input);

    expect(response.id).toBe(input.id);
    expect(response.stock).toBe(productRepositorySpy.outputFind.getStock());
  });

  it("should throw if productRepository throws", () => {
    const { sut, productRepositorySpy } = makeSut();

    const input = {
      id: "teste id",
    };

    jest
      .spyOn(productRepositorySpy, "find")
      .mockRejectedValueOnce(new Error("Fail to connect"));

    expect(async () => {
      await sut.execute(input);
    }).rejects.toThrow("Fail to connect");
  });
});
