import { ClientAdmFacadeFactory } from "@/modules/client-adm/factory";
import { StoreCatalogFacadeFactory } from "@/modules/store-catalog/factory";
import { ClientAdmFacadeInterface } from "@/modules/client-adm/facade";
import { StoreCatalogFacadeInterface } from "@/modules/store-catalog/facade";
import { ProductAdmFacadeFactory } from "@/modules/product-adm/factory";
import { ProductAdmFacadeInterface } from "@/modules/product-adm/facade";
import PlaceOrderUsecase from "./place-order.usecase";

const makeSut = () => {
  const clientAdmFacade = ClientAdmFacadeFactory.create();
  const productAdmFacade = ProductAdmFacadeFactory.create();
  const storeCatalogFacade = StoreCatalogFacadeFactory.create();

  const sut = new PlaceOrderUsecase(
    clientAdmFacade,
    productAdmFacade,
    storeCatalogFacade
  );

  defaultMock(clientAdmFacade, productAdmFacade, storeCatalogFacade);
  return {
    sut,
    clientAdmFacade,
    productAdmFacade,
    storeCatalogFacade
  };
};

const defaultMock = (
  clientAdmFacade: ClientAdmFacadeInterface,
  productAdmFacade: ProductAdmFacadeInterface,
  storeCatalogFacade: StoreCatalogFacadeInterface
) => {
  jest.spyOn(clientAdmFacade, "find").mockResolvedValue({
    id: "c2",
    name: "john",
    email: "email@email 1",
    address: "street 1",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  jest.spyOn(productAdmFacade, "checkStock").mockResolvedValue({
    id: "p1",
    stock: 1,
  });

  jest.spyOn(storeCatalogFacade, "find").mockResolvedValue({
    id: "p1",
    name: "ball",
    description: "red",
    salesPrice: 6.99,
  });
};

describe("PlaceOrder usecase", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("clientAdmFacade", () => {
    it("should call ClientAdmFacade", async () => {
      const { sut, clientAdmFacade } = makeSut();

      const clientAdmFacadeSpy = jest
        .spyOn(clientAdmFacade, "find")
        .mockClear()
        .mockResolvedValueOnce({
          id: "c2",
          name: "john",
          email: "email@email 1",
          address: "street 1",
          createdAt: new Date(),
          updatedAt: new Date(),
        });

      const input = {
        clientId: "c1",
        products: [{ productId: "1" }, { productId: "2" }],
      };

      await sut.execute(input);

      expect(clientAdmFacadeSpy).toHaveBeenCalled();
    });

    it("should throw when clientId was not found", async () => {
      const { sut, clientAdmFacade } = makeSut();

      jest
        .spyOn(clientAdmFacade, "find")
        .mockRejectedValue(new Error("Client not found"));

      const input = {
        clientId: "",
        products: [{ productId: "1" }, { productId: "2" }],
      };

      await expect(async () => {
        await sut.execute(input);
      }).rejects.toThrow(new Error("Client not found"));
    });
  });

  describe("productAdmFacade", () => {
    it("should call ProductAdmFacade", async () => {
      const { sut, productAdmFacade } = makeSut();

      const productAdmFacadeSpy = jest
        .spyOn(productAdmFacade, "checkStock")
        .mockClear()
        .mockResolvedValue({
          id: "p1",
          stock: 1,
        });

      const input = {
        clientId: "c1",
        products: [{ productId: "1" }, { productId: "2" }],
      };

      await sut.execute(input);

      expect(productAdmFacadeSpy).toHaveBeenCalledTimes(input.products.length);
    });

    it("should throw when an empty list of products is provided", async () => {
      const { sut, productAdmFacade } = makeSut();

      const productAdmFacadeSpy = jest
        .spyOn(productAdmFacade, "checkStock")
        .mockResolvedValueOnce({
          id: "p1",
          stock: 1,
        });

      const input = {
        clientId: "",
        products: [],
      };

      await expect(async () => {
        await sut.execute(input);
      }).rejects.toThrow(new Error("Must provide at least one product"));
      expect(productAdmFacadeSpy).toHaveBeenCalledTimes(0);
    });

    it("should throw when a product is out of stock", async () => {
      const { sut, productAdmFacade } = makeSut();

      const productAdmFacadeSpy = jest
        .spyOn(productAdmFacade, "checkStock")
        .mockResolvedValueOnce({
          id: "p1",
          stock: 0,
        });

      const input = {
        clientId: "",
        products: [{ productId: "p1" }],
      };

      await expect(async () => {
        await sut.execute(input);
      }).rejects.toThrow(new Error("Product p1 out of stock"));
      expect(productAdmFacadeSpy).toHaveBeenCalledTimes(1);
    });
  });


  describe("storeCatalogFacade", () => {
    it("should call StoreCatalogFacade", async () => {
      const { sut, storeCatalogFacade } = makeSut();

      const storeCatalogFacadeSpy = jest
        .spyOn(storeCatalogFacade, "find")
        .mockClear()
        .mockResolvedValueOnce({
          id: "p1",
          name: "ball",
          description: "red",
          salesPrice: 6.99
        });

      const input = {
        clientId: "c1",
        products: [{ productId: "1" }, { productId: "2" }],
      };

      await sut.execute(input);

      expect(storeCatalogFacadeSpy).toHaveBeenCalledTimes(2);
    });

    it("should throw when product was not found", async () => {
      const { sut, storeCatalogFacade } = makeSut();

      jest
        .spyOn(storeCatalogFacade, "find")
        .mockClear()
        .mockRejectedValue(new Error("Product not found"));

      const input = {
        clientId: "",
        products: [{ productId: "1" }, { productId: "2" }],
      };

      await expect(async () => {
        await sut.execute(input);
      }).rejects.toThrow(new Error("Product not found"));
    });
  });
});
