import { UsecaseInterface } from "@/modules/@shared/usecase";
import { ClientGatewayInterface } from "@/modules/client-adm/gateway";
import { Client } from "@/modules/client-adm/domain";
import {
  AddClientUsecaseInputDTO,
  AddClientUsecaseOutputDTO,
} from "./add-client.dto";
import { Address } from "@/modules/@shared/domain/value-object";

export default class AddClientUsecase implements UsecaseInterface {
  constructor(private readonly repository: ClientGatewayInterface) {}

  async execute(
    input: AddClientUsecaseInputDTO
  ): Promise<AddClientUsecaseOutputDTO> {
    const client = new Client({
      name: input.name,
      email: input.email,
      address: new Address(
        input.address.street,
        input.address.number,
        input.address.complement,
        input.address.city,
        input.address.state,
        input.address.zipCode
      ),
    });
    await this.repository.add(client);

    return {
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
    };
  }
}
