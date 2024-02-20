import { Id } from "@/modules/@shared/domain/value-object";
import { OrderGateway } from "@/modules/checkout/gateway";
import { Order } from "@/modules/checkout/domain";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderGateway {
  async save(order: Order, invoiceId: Id): Promise<Order> {
    await OrderModel.create({
      id: order.getId().getValue(),
      invoiceId: invoiceId.getValue(),
      clientId: order.getClient().getId().getValue(),
      status: order.getStatus(),
    });
    return order;
  }
}
