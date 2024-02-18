import { ClientAdmFacadeFactory } from "@/modules/client-adm/factory";
import { StoreCatalogFacadeFactory } from "@/modules/store-catalog/factory";
import PlaceOrderUsecase from "./place-order.usecase";
import { ClientAdmFacade } from "@/modules/client-adm/facade";
import { StoreCatalogFacade } from "@/modules/store-catalog/facade";

const makeSut = () => {
  const clientAdmFacade = ClientAdmFacadeFactory.create();
  const storeCatalogFacade = StoreCatalogFacadeFactory.create();

  const sut = new PlaceOrderUsecase(clientAdmFacade, storeCatalogFacade);

  defaultMock(clientAdmFacade, storeCatalogFacade);
  return {
    sut,
    clientAdmFacade,
    storeCatalogFacade,
  };
};

const defaultMock = (
  clientAdmFacade: ClientAdmFacade,
  storeCatalogFacade: StoreCatalogFacade
) => {
  jest.spyOn(clientAdmFacade, "find").mockResolvedValue({
    id: "c2",
    name: "john",
    email: "email@email 1",
    address: "street 1",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  jest.spyOn(storeCatalogFacade, "find").mockResolvedValue({
    id: "p1",
    name: "ball",
    description: "red",
    salesPrice: 10,
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

  describe("storeCatalogFacade", () => {
    it("should call StoreCatalogFacade", async () => {
      const { sut, storeCatalogFacade } = makeSut();

      const storeCatalogFacadeSpy = jest
        .spyOn(storeCatalogFacade, "find")
        .mockResolvedValueOnce({
          id: "p1",
          name: "ball",
          description: "red",
          salesPrice: 10,
        });

      const input = {
        clientId: "c1",
        products: [{ productId: "1" }, { productId: "2" }],
      };

      await sut.execute(input);

      expect(storeCatalogFacadeSpy).toHaveBeenCalledTimes(
        input.products.length
      );
    });

    it("should throw when an empty list of products is provided", async () => {
      const { sut, storeCatalogFacade } = makeSut();

      const storeCatalogFacadeSpy = jest
        .spyOn(storeCatalogFacade, "find")
        .mockResolvedValueOnce({
          id: "p1",
          name: "ball",
          description: "red",
          salesPrice: 10,
        });

      const input = {
        clientId: "",
        products: [],
      };

      await expect(async () => {
        await sut.execute(input);
      }).rejects.toThrow(new Error("Must provide at least one product"));
      expect(storeCatalogFacadeSpy).toHaveBeenCalledTimes(0);
    });
  });
});
