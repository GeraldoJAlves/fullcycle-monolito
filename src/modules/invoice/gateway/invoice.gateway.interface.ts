import { Id } from "@/modules/@shared/domain/value-object";
import { Invoice } from "@/modules/invoice/domain";

export default interface InvoiceGatewayInterface {
  find(invoiceId: Id): Promise<Invoice>;
  save(invoice: Invoice): Promise<Invoice>;
}
