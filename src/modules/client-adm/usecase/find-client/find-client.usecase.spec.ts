import { Id } from "@/modules/@shared/domain/value-object";
import { Client } from "../../domain";
import { ClientGatewayInterface } from "../../gateway";
import FindClientUsecase from "./find-client.usecase";

class ClientRepository implements ClientGatewayInterface {
  create(client: Client): Promise<void> {
    throw new Error("Method not implemented.");
  }
  find(id: Id): Promise<Client> {
    throw new Error("Method not implemented.");
  }
}

describe("FindClient usecase", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call ClientRepository", async () => {
    const repository = new ClientRepository();
    const usecase = new FindClientUsecase(repository);

    const client = new Client({
      name: "john",
      email: "john@email.com",
      address: "no address",
    });

    const repositorySpy = jest
      .spyOn(repository, "find")
      .mockResolvedValueOnce(client);

    const outputClient = await usecase.execute({
      id: client.getId().getValue(),
    });

    expect(repositorySpy).toHaveBeenCalled();
    expect(outputClient).toEqual({
      id: client.getId().getValue(),
      name: client.getName(),
      email: client.getEmail(),
      address: client.getAddress(),
      createdAt: client.getCreatedAt(),
      updatedAt: client.getUpdatedAt(),
    });
  });

  it("should throw if ClientRepository throws", async () => {
    const repository = new ClientRepository();
    const usecase = new FindClientUsecase(repository);

    jest
      .spyOn(repository, "find")
      .mockRejectedValueOnce(new Error("fail to connect"));

    expect(async () => {
      await usecase.execute({
        id: "1",
      });
    }).rejects.toThrow("fail to connect");
  });
});
