import { UsecaseInterface } from "@/modules/@shared/usecase";
import { Id } from "@/modules/@shared/domain/value-object";
import { InvoiceGatewayInterface } from "@/modules/invoice/gateway";
import {
  FindInvoiceUsecaseInputDTO,
  FindInvoiceUsecaseOutputDTO,
} from "./find-invoice.dto";

export default class FindInvoiceUsecase implements UsecaseInterface {
  constructor(private readonly repository: InvoiceGatewayInterface) {}

  async execute(
    input: FindInvoiceUsecaseInputDTO
  ): Promise<FindInvoiceUsecaseOutputDTO> {
    const invoice = await this.repository.find(new Id(input.id));

    return {
      id: invoice.getId().getValue(),
      name: invoice.getName(),
      document: invoice.getDocument(),
      address: {
        street: invoice.getAddress().getStreet(),
        number: invoice.getAddress().getNumber(),
        complement: invoice.getAddress().getComplement(),
        city: invoice.getAddress().getCity(),
        state: invoice.getAddress().getState(),
        zipCode: invoice.getAddress().getZipCode(),
      },
      items: invoice.getItems().map((item) => ({
        id: item.getId().getValue(),
        name: item.getName(),
        price: item.getPrice(),
      })),
      total: invoice.getTotal(),
      createdAt: invoice.getCreatedAt(),
    };
  }
}
