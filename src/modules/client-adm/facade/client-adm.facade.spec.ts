import { ClientRepository } from "../repository";
import { AddClientUsecase } from "../usecase/add-client";
import { FindClientUsecase } from "../usecase/find-client";
import ClientAdmFacade from "./client-adm.facade";

const makeSut = () => {
  const repository = new ClientRepository();
  const addClientUsecase = new AddClientUsecase(repository);
  const findClientUsecase = new FindClientUsecase(repository);
  const sut = new ClientAdmFacade(addClientUsecase, findClientUsecase);

  return {
    sut,
    addClientUsecase,
    findClientUsecase,
  };
};

describe("ClientAdm facade", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("add()", () => {
    it("should call AddClientUsecase", async () => {
      const { addClientUsecase, sut } = makeSut();

      const clientProps = {
        id: "1",
        name: "Gerard",
        email: "email@email.com",
        address: "no street",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const addClientUsecaseSpy = jest
        .spyOn(addClientUsecase, "execute")
        .mockResolvedValueOnce(clientProps);

      const response = await sut.add({
        name: clientProps.name,
        email: clientProps.email,
        address: clientProps.address,
      });

      expect(response).toEqual(clientProps);
      expect(addClientUsecaseSpy).toHaveBeenCalled();
    });

    it("should throw if AddClientUsecase throws", async () => {
      const { addClientUsecase, sut } = makeSut();

      const clientProps = {
        id: "1",
        name: "Gerard",
        email: "email@email.com",
        address: "no street",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(addClientUsecase, "execute")
        .mockRejectedValueOnce(new Error("fail to connect"));

      expect(async () => {
        await sut.add({
          name: clientProps.name,
          email: clientProps.email,
          address: clientProps.address,
        });
      }).rejects.toThrow("fail to connect");
    });
  });

  describe("find()", () => {
    it("should call FindClientUsecase", async () => {
      const { findClientUsecase, sut } = makeSut();

      const client = {
        id: "1",
        name: "Gerard",
        email: "email@email.com",
        address: "no street",
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const findClientUsecaseSpy = jest
        .spyOn(findClientUsecase, "execute")
        .mockResolvedValueOnce(client);

      const output = await sut.find({
        id: client.id,
      });

      expect(output).toEqual(client);
      expect(findClientUsecaseSpy).toHaveBeenCalled();
    });


    it("should throw if FindClientUsecase throws", async () => {
      const { findClientUsecase, sut } = makeSut();

      jest
        .spyOn(findClientUsecase, "execute")
        .mockRejectedValueOnce(new Error("fail to connect"));

      expect(async () => {
        await sut.find({id: "1"
        });
      }).rejects.toThrow("fail to connect");
    });
  });
});
