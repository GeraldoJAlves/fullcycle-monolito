import ClientAdmFacadeFactory from "@/modules/client-adm/factory/facade.factory";
import PlaceOrderUsecase from "./place-order.usecase";

const makeSut = () => {
  const clientAdmFacade = ClientAdmFacadeFactory.create();

  const sut = new PlaceOrderUsecase(clientAdmFacade);
  return {
    sut,
    clientAdmFacade,
  };
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
        .mockResolvedValueOnce({
          id: "c1",
          name: "john",
          email: "email@email 1",
          address: "street 1",
          createdAt: new Date(),
          updatedAt: new Date(),
        });

      const input = {
        clientId: "",
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
});
