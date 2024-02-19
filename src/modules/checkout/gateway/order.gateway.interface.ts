import { Order } from "../domain";

export default interface OrderGateway {
  save(order: Order): Promise<Order>;
}
