import { Id } from "@/modules/@shared/domain/value-object";
import { Product } from "@/modules/store-catalog/domain";
import { ProductGatewayInterface } from "@/modules/store-catalog/gateway";
import FindAllProductsUsecase from "./find-all-products.usecase";

class ProducRepository implements ProductGatewayInterface {
  findAll(): Promise<Product[]> {
    throw new Error("Method not implemented.");
  }
  find(id: Id): Promise<Product> {
    throw new Error("Method not implemented.");
  }
}

const makeSut = () => {
  const repositorySpy = new ProducRepository();
  const sut = new FindAllProductsUsecase(repositorySpy);
  return {
    repositorySpy,
    sut,
  };
};

describe("FindAllProducts usecase", () => {
  it("should call product repository", async () => {
    const { sut, repositorySpy } = makeSut();

    const products = [
      new Product({
        id: new Id("1"),
        name: "product 1",
        description: "",
        salesPrice: 8.11,
      }),
      new Product({
        id: new Id("2"),
        name: "product 2",
        description: "description 2",
        salesPrice: 3.91,
      }),
    ];

    jest.spyOn(repositorySpy, "findAll").mockResolvedValue(products);

    const response = await sut.execute({});

    expect(response.products.length).toBe(2);
    expect(response.products[0]).toEqual({
      id: "1",
      name: "product 1",
      description: "",
      salesPrice: 8.11,
    });

    expect(response.products[1]).toEqual({
      id: "2",
      name: "product 2",
      description: "description 2",
      salesPrice: 3.91,
    });
  });

  it("should call product repository", async () => {
    const { sut, repositorySpy } = makeSut();

    jest
      .spyOn(repositorySpy, "findAll")
      .mockRejectedValueOnce(new Error("not connected"));

    await expect(async () => {
      await sut.execute({});
    }).rejects.toThrow(new Error("not connected"));
  });
});
