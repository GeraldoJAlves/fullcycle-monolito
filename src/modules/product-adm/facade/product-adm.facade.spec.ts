import { ProductRepository } from "@/modules/product-adm/repository";
import { AddProductUsecase } from "@/modules/product-adm/usecase/add-product";
import ProductAdmFacade from "./product-adm.facade";
import { CheckStockUsecase } from "@/modules/product-adm/usecase/check-stock";

const makeSut = () => {
  const repository = new ProductRepository();
  const addProductUsecase = new AddProductUsecase(repository);
  const checkStockUsecase = new CheckStockUsecase(repository);

  const sut = new ProductAdmFacade(addProductUsecase, checkStockUsecase);

  return {
    addProductUsecase,
    checkStockUsecase,
    sut,
  };
};

describe("ProductAdm facade", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("addProduct()", () => {
    it("should call addProductUsecase", async () => {
      const { sut, addProductUsecase } = makeSut();

      const input = {
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
        .spyOn(addProductUsecase, "execute")
        .mockResolvedValueOnce(output);

      const response = await sut.addProduct(input);

      expect(response).toEqual(output);
      expect(usecaseSpy).toHaveBeenCalled();
    });

    it("should throw if AddProductUsecase throws", async () => {
      const { sut, addProductUsecase } = makeSut();

      const input = {
        name: "toy car",
        description: "purple car",
        purchasePrice: 10000,
        stock: 4,
      };

      jest
        .spyOn(addProductUsecase, "execute")
        .mockRejectedValue(new Error("usecase error"));

      expect(async () => {
        await sut.addProduct(input);
      }).rejects.toThrow("usecase error");
    });
  });

  describe("checkStock()", () => {
    it("should call checkStockUsecase", async () => {
      const { sut, checkStockUsecase } = makeSut();

      const input = {
        id: "product 3",
      };

      const output = {
        ...input,
        stock: 8,
      };

      const usecaseSpy = jest
        .spyOn(checkStockUsecase, "execute")
        .mockResolvedValueOnce(output);

      const response = await sut.checkStock(input);

      expect(response).toEqual(output);
      expect(usecaseSpy).toHaveBeenCalled();
    });

    it("should throw if CheckStockUsecase throws", async () => {
      const { sut, checkStockUsecase } = makeSut();

      const input = {
        id: "product 1",
      };

      jest
        .spyOn(checkStockUsecase, "execute")
        .mockRejectedValue(new Error("usecase error"));

      expect(async () => {
        await sut.checkStock(input);
      }).rejects.toThrow("usecase error");
    });
  });
});
