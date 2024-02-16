import { Id } from "@/modules/@shared/domain/value-object";
import { Product } from "@/modules/store-catalog/domain";
import { ProductGatewayInterface } from "@/modules/store-catalog/gateway";
import FindProductUsecase from "./find-product.usecase";

class ProducRepository implements ProductGatewayInterface {
  findAll(): Promise<Product[]> {
    throw new Error("Method not implemented.");
  }
  find(id: Id): Promise<Product> {
    throw new Error("Method not implemented.");
  }
}

const makeSut = () => {
  const repository = new ProducRepository();
  const sut = new FindProductUsecase(repository);
  return {
    repository,
    sut,
  };
};

describe("FindProduct usecase", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call ProductRepository find", async () => {
    const { sut, repository } = makeSut();

    const repositorySpy = jest.spyOn(repository, "find").mockResolvedValueOnce(
      new Product({
        id: new Id("1"),
        name: "product 1",
        description: "desc1",
        salesPrice: 4.33,
      })
    );

    const response = await sut.execute({ id: "1" });

    expect(response.id).toBe("1");
    expect(repositorySpy).toHaveBeenCalled();
  });

  it("should throws if product repository throw", async () => {
    const { sut, repository } = makeSut();

    jest
      .spyOn(repository, "find")
      .mockRejectedValueOnce(new Error("not connected"));

    await expect(async () => {
      await sut.execute({ id: "id" });
    }).rejects.toThrow(new Error("not connected"));
  });
});
