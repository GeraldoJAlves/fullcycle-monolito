import { Id } from "@/modules/@shared/domain/value-object";
import { InvoiceFactory } from "@/modules/invoice/factory";
import { Invoice } from "@/modules/invoice/domain";
import { InvoiceGatewayInterface } from "@/modules/invoice/gateway";
import InvoiceModel from "./invoice.model";
import InvoiceItemModel from "./invoice-item.model";

export default class InvoiceRepository implements InvoiceGatewayInterface {
  async find(invoiceId: Id): Promise<Invoice> {
    const invoiceData = await InvoiceModel.findOne({
      where: { id: invoiceId.getValue() },
    });

    if (!invoiceData) {
      throw new Error(`Invoice with id ${invoiceId.getValue()} not found`);
    }

    const itemsData = await invoiceData.getItems();

    return InvoiceFactory.create({
      id: invoiceData.id,
      name: invoiceData.name,
      document: invoiceData.document,
      street: invoiceData.street,
      number: invoiceData.number,
      complement: invoiceData.complement,
      city: invoiceData.city,
      state: invoiceData.state,
      zipCode: invoiceData.zipCode,
      items: itemsData.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
      })),
      createdAt: invoiceData.createdAt,
    });
  }

  async save(invoice: Invoice): Promise<Invoice> {
    await InvoiceModel.create({
      id: invoice.getId().getValue(),
      name: invoice.getName(),
      document: invoice.getDocument(),
      street: invoice.getAddress().getStreet(),
      number: invoice.getAddress().getNumber(),
      complement: invoice.getAddress().getComplement(),
      city: invoice.getAddress().getCity(),
      state: invoice.getAddress().getState(),
      zipCode: invoice.getAddress().getZipCode(),
      createdAt: invoice.getCreatedAt(),
    });

    for (const item of invoice.getItems()) {
      await InvoiceItemModel.create({
        id: item.getId().getValue(),
        invoiceId: invoice.getId().getValue(),
        name: item.getName(),
        price: item.getPrice(),
      });
    }

    return invoice;
  }
}
