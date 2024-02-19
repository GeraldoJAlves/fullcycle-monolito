import { Id } from "@/modules/@shared/domain/value-object";
import { ClientGatewayInterface } from "@/modules/client-adm/gateway";
import { FindClientUsecaseInputDTO, FindClientUsecaseOutputDTO } from "./find-client.dto";

export default class FindClientUsecase {
  constructor (private readonly repository: ClientGatewayInterface) {}

  async execute(input: FindClientUsecaseInputDTO): Promise<FindClientUsecaseOutputDTO> {
    const client = await this.repository.find(new Id(input.id))
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
      updatedAt: client.getUpdatedAt()
    }
  }
}