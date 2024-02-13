import { ProductRepository } from "@/modules/store-catalog/repository";
import { FindAllProductsUsecase } from "@/modules/store-catalog/usecase/find-all-products";
import { FindProductUsecase } from "@/modules/store-catalog/usecase/find-product";
import StoreCatalogFacade from "./store-catalog.facade";

const makeSut = () => {
  const repository = new ProductRepository();
  const findProductUsecase = new FindProductUsecase(repository);
  const findAllProductUsecase = new FindAllProductsUsecase(repository);

  const sut = new StoreCatalogFacade(findProductUsecase, findAllProductUsecase);
  return {
    sut,
    findProductUsecase,
    findAllProductUsecase,
  };
};

describe("StoreCatalog facade", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("find()", () => {
    it("should call FindProductUsecase", async () => {
      const { sut, findProductUsecase } = makeSut();

      const outputUsecase = {
        id: "1",
        name: "product 1",
        description: "desc 1",
        salesPrice: 8.55,
      };

      const findProductUsecaseSpy = jest
        .spyOn(findProductUsecase, "execute")
        .mockResolvedValueOnce(outputUsecase);

      const response = await sut.find({ id: "1" });

      expect(response.id).toBe("1");
      expect(findProductUsecaseSpy).toHaveBeenCalled();
    });

    it("should throw if FindProductUsecase throws", async () => {
      const { sut, findProductUsecase } = makeSut();

      jest
        .spyOn(findProductUsecase, "execute")
        .mockRejectedValue(new Error("usecase error"));

      await expect(async () => {
        await sut.find({id:"1"});
      }).rejects.toThrow("usecase error");
    });
  });

  describe("findAll()", () => {
    it("should call findAllProductUsecase", async () => {
      const { sut, findAllProductUsecase } = makeSut();

      const outputUsecase = {
        products: [
          {
            id: "1",
            name: "product 1",
            description: "desc 1",
            salesPrice: 8.55,
          },
        ],
      };

      const findAllProductUsecaseSpy = jest
        .spyOn(findAllProductUsecase, "execute")
        .mockResolvedValueOnce(outputUsecase);

      const response = await sut.findAll({});

      expect(response.products.length).toBe(1);
      expect(response.products[0].id).toBe("1");
      expect(findAllProductUsecaseSpy).toHaveBeenCalled();
    });
  });
});
