import { UsecaseInterface } from "@/modules/@shared/usecase";
import { ClientGatewayInterface } from "@/modules/client-adm/gateway";
import { Client } from "@/modules/client-adm/domain";
import {
  AddClientUsecaseInputDTO,
  AddClientUsecaseOutputDTO,
} from "./add-client.dto";

export default class AddClientUsecase implements UsecaseInterface {
  constructor(private readonly repository: ClientGatewayInterface) {}

  async execute(
    input: AddClientUsecaseInputDTO
  ): Promise<AddClientUsecaseOutputDTO> {
    const client = new Client({
      name: input.name,
      email: input.email,
      address: input.address,
    });
    await this.repository.add(client);

    return {
      id: client.getId().getValue(),
      name: client.getName(),
      email: client.getEmail(),
      address: client.getAddress(),
      createdAt: client.getCreatedAt(),
      updatedAt: client.getUpdatedAt(),
    };
  }
}
