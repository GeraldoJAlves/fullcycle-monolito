import { ProductRepository } from "@/modules/product-adm/repository";
import { AddProductUsecase } from "@/modules/product-adm/usecase/add-product";
import ProductAdmFacade from "./product-adm.facade";
import { AddProductFacadeInputDTO } from "./product-adm.facade.interface";

describe("ProductAdm facade", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("addProduct", () => {
    it("should call addProductUseCase", async () => {
      const repository = new ProductRepository();
      const usecase = new AddProductUsecase(repository);

      const input: AddProductFacadeInputDTO = {
        name: "toy car",
        description: "purple car",
        purchasePrice: 10000,
        stock: 4,
      };

      const output = {
        ...input,
        id: "teste id",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const usecaseSpy = jest
        .spyOn(usecase, "execute")
        .mockResolvedValueOnce(output);

      const sut = new ProductAdmFacade(usecase);

      const response = await sut.addProduct(input);

      expect(response).toEqual(output);
      expect(usecaseSpy).toHaveBeenCalled();
    });

    it("should throw if AddProductUsecase throws", async () => {
      const repository = new ProductRepository();
      const usecase = new AddProductUsecase(repository);

      const input: AddProductFacadeInputDTO = {
        name: "toy car",
        description: "purple car",
        purchasePrice: 10000,
        stock: 4,
      };

      jest
        .spyOn(usecase, "execute")
        .mockRejectedValue(new Error("usecase error"));

      const sut = new ProductAdmFacade(usecase);

      expect(async () => {
        await sut.addProduct(input);
      }).rejects.toThrow("usecase error");
    });
  });
});
