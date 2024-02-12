import { AggregateRoot, BaseEntity } from "@/modules/@shared/domain/entity";
import { Id } from "@/modules/@shared/domain/value-object";

type ProductProps = {
  id?: Id;
  name: string;
  description: string;
  purchasePrice: number;
  stock: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export default class Product extends BaseEntity implements AggregateRoot {
  private name;
  private description;
  private purchasePrice;
  private stock;

  constructor(props: ProductProps) {
    super(props.id, props.createdAt, props.updatedAt)
    this.name = props.name
    this.description = props.description;
    this.purchasePrice = props.purchasePrice;
    this.stock = props.stock;
  }

  getName() {
    return this.name;
  }

  getDescription() {
    return this.description;
  }

  getPurchasePrice() {
    return this.purchasePrice;
  }

  getStock() {
    return this.stock;
  }
}
