import { Order } from "@/modules/checkout/domain";

export default interface OrderGateway {
  save(order: Order): Promise<Order>;
}
