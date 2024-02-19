import { Id } from "@/modules/@shared/domain/value-object";
import { Client } from "@/modules/client-adm/domain";
import { ClientGatewayInterface } from "@/modules/client-adm/gateway";
import AddClientUsecase from "./add-client.usecase";

class ClientRepository implements ClientGatewayInterface {
  add(client: Client): Promise<void> {
    throw new Error("Method not implemented.");
  }
  find(id: Id): Promise<Client> {
    throw new Error("Method not implemented.");
  }
}

const defaultInputAddress = {
  street: "street 2",
  number: "30",
  complement: "none",
  city: "city M",
  state: "WC",
  zipCode: "999-99"
}

describe("AddClient usecase", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call ClientRepository", async () => {
    const repository = new ClientRepository();
    const usecase = new AddClientUsecase(repository);

    const input = {
      name: "tony",
      email: "tony@email.com",
      address: defaultInputAddress,
    };

    const repositorySpy = jest.spyOn(repository, "add").mockResolvedValueOnce();

    const response = await usecase.execute(input);

    expect(response.id).toBeDefined();
    expect(response.name).toBe(input.name);
    expect(repositorySpy).toHaveBeenCalled()
  });

  it("should throw if ClientRepository throws", async () => {
    const repository = new ClientRepository();
    const usecase = new AddClientUsecase(repository);

    const input = {
      name: "tony",
      email: "tony@email.com",
      address: defaultInputAddress,
    };

    jest.spyOn(repository, "add").mockResolvedValueOnce();

    const response = await usecase.execute(input);

    expect(response.id).toBeDefined();
    expect(response.name).toBe(input.name);
    expect(response.email).toBe(input.email);
    expect(response.address).toEqual(defaultInputAddress);
    expect(response.createdAt).toBeDefined();
    expect(response.updatedAt).toBeDefined();
  });
});
