import { BaseEntity } from "@/modules/@shared/domain/entity";
import { Id } from "@/modules/@shared/domain/value-object";

type InvoiceItemProps = {
  id?: Id;
  name: string;
  price: number;
};

export default class InvoiceItem extends BaseEntity {
  private name: string;
  private price: number;

  constructor(props: InvoiceItemProps) {
    super(props.id);
    this.name = props.name;
    this.price = props.price;
    this.validate()
  }

  private validate() {
    if (this.price <= 0) {
      throw Error(`Item ${this.name} must be greater than 0`);
    }
  }

  getName() {
    return this.name;
  }

  getPrice() {
    return this.price;
  }
}
