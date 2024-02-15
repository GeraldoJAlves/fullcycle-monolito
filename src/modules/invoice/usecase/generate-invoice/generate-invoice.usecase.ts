import { UsecaseInterface } from "@/modules/@shared/usecase";
import { InvoiceGatewayInterface } from "@/modules/invoice/gateway";
import { InvoiceFactory } from "@/modules/invoice/factory";
import {
  GenerateInvoiceUsecaseInputDto,
  GenerateInvoiceUsecaseOutputDto,
} from "./generate-invoice.dto";

export default class GenerateInvoiceUsecase implements UsecaseInterface {
  constructor(private readonly repository: InvoiceGatewayInterface) {}

  async execute(
    input: GenerateInvoiceUsecaseInputDto
  ): Promise<GenerateInvoiceUsecaseOutputDto> {
    const invoice = InvoiceFactory.create(input);

    await this.repository.save(invoice);

    return {
      id: invoice.getId().getValue(),
      name: invoice.getName(),
      document: invoice.getDocument(),
      street: invoice.getAddress().getStreet(),
      number: invoice.getAddress().getNumber(),
      complement: invoice.getAddress().getComplement(),
      city: invoice.getAddress().getCity(),
      state: invoice.getAddress().getState(),
      zipCode: invoice.getAddress().getZipCode(),
      items: invoice.getItems().map((item) => ({
        id: item.getId().getValue(),
        name: item.getName(),
        price: item.getPrice(),
      })),
      total: invoice.getTotal(),
    };
  }
}
