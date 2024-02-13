import { Id } from "@/modules/@shared/domain/value-object";
import { Client } from "../../domain";
import { ClientGatewayInterface } from "../../gateway";
import AddClientUsecase from "./add-client.usecase";

class ClientRepository implements ClientGatewayInterface {
  create(client: Client): Promise<void> {
    throw new Error("Method not implemented.");
  }
  find(id: Id): Promise<Client> {
    throw new Error("Method not implemented.");
  }
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
      address: "main street, city B",
    };

    jest.spyOn(repository, "create").mockResolvedValueOnce();

    const response = await usecase.execute(input);

    expect(response.id).toBeDefined();
    expect(response.name).toBe(input.name);
  });

  it("should throw if ClientRepository throws", async () => {
    const repository = new ClientRepository();
    const usecase = new AddClientUsecase(repository);

    const input = {
      name: "tony",
      email: "tony@email.com",
      address: "main street, city B",
    };

    jest.spyOn(repository, "create").mockResolvedValueOnce();

    const response = await usecase.execute(input);

    expect(response.id).toBeDefined();
    expect(response.name).toBe(input.name);
    expect(response.email).toBe(input.email);
    expect(response.address).toBe(input.address);
    expect(response.createdAt).toBeDefined();
    expect(response.updatedAt).toBeDefined();
  });
});
