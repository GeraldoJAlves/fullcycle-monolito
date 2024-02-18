import { AggregateRoot, BaseEntity } from "@/modules/@shared/domain/entity";
import { Id } from "@/modules/@shared/domain/value-object";
import Client from "./client.entity";
import Product from "./product.entity";

type OrderProps = {
  id?: Id;
  client: Client;
  products: Product[];
  status?: string;
};

export default class Order extends BaseEntity implements AggregateRoot {
  private client: Client;
  private products: Product[];
  private status: string;

  constructor(props: OrderProps) {
    super(props.id);
    this.client = props.client;
    this.products = props.products;
    this.status = props.status || "pending";
    this.validate();
  }

  private validate() {
    if (this.products.length === 0) {
      throw new Error("Order must have at least one product");
    }
  }

  approve() {
    this.status = 'approved'
  }

  getTotal() {
    return this.products.reduce((acc, product) => acc + product.getSalesPrice(), 0)
  }

  getClient() {
    return this.client;
  }

  getProducts() {
    return this.products;
  }

  getStatus() {
    return this.status;
  }
}
