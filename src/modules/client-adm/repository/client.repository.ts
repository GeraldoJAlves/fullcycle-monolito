import { Address, Id } from "@/modules/@shared/domain/value-object";
import { Client } from "@/modules/client-adm/domain";
import { ClientGatewayInterface } from "@/modules/client-adm/gateway";
import ClientModel from "./client.model";

export default class ClientRepository implements ClientGatewayInterface {
  async add(client: Client): Promise<void> {
    await ClientModel.create({
      id: client.getId().getValue(),
      name: client.getName(),
      email: client.getEmail(),
      street: client.getAddress().getStreet(),
      number: client.getAddress().getNumber(),
      complement: client.getAddress().getComplement(),
      city: client.getAddress().getCity(),
      state: client.getAddress().getState(),
      zipCode: client.getAddress().getZipCode(),
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
      address: new Address(
        client.street,
        client.number,
        client.complement,
        client.city,
        client.state,
        client.zipCode
      ),
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    });
  }
}
