import { Address, Id } from "@/modules/@shared/domain/value-object";
import { Client } from "@/modules/client-adm/domain";
import { ClientGatewayInterface } from "@/modules/client-adm/gateway";
import FindClientUsecase from "./find-client.usecase";

class ClientRepository implements ClientGatewayInterface {
  add(client: Client): Promise<void> {
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

    const address = new Address(
      "street 1",
      "1",
      "",
      "city A",
      "UC",
      "999999"
    )

    const client = new Client({
      name: "john",
      email: "john@email.com",
      address,
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
      address: {
        street: client.getAddress().getStreet(),
        number: client.getAddress().getNumber(),
        complement: client.getAddress().getComplement(),
        city: client.getAddress().getCity(),
        state: client.getAddress().getState(),
        zipCode: client.getAddress().getZipCode(),
      },
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
