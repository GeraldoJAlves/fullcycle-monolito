import { Id } from "@/modules/@shared/domain/value-object";
import { Order } from "@/modules/checkout/domain";

export default interface OrderGateway {
  save(order: Order, invoiceId: Id): Promise<Order>;
}
