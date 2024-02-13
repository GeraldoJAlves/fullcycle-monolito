import { Id } from "@/modules/@shared/domain/value-object";
import { Client } from "@/modules/client-adm/domain";
import { ClientGatewayInterface } from "@/modules/client-adm/gateway";
import ClientModel from "./client.model";

export default class ClientRepository implements ClientGatewayInterface {
  async create(client: Client): Promise<void> {
    await ClientModel.create({
      id: client.getId().getValue(),
      name: client.getName(),
      email: client.getEmail(),
      address: client.getAddress(),
      createdAt: client.getCreatedAt(),
      updatedAt: client.getUpdatedAt(),
    });
  }

  async find(id: Id): Promise<Client> {
    const client = await ClientModel.findOne({ where: { id: id.getValue() } });

    if (!client) {
      throw new Error(`Client with id ${id.getValue()} not found`);
    }

    return new Client({
      id: new Id(client.id),
      name: client.name,
      email: client.email,
      address: client.address,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    });
  }
}
