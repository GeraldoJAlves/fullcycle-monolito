import { AggregateRoot, BaseEntity } from "@/modules/@shared/domain/entity";
import { Id, Address } from "@/modules/@shared/domain/value-object";
import InvoiceItem from "./invoice-items.enitty";

type InvoiceProps = {
  id?: Id;
  name: string;
  document: string;
  address: Address;
  items: InvoiceItem[];
  createdAt?: Date;
  updatedAt?: Date;
};

export default class Invoice extends BaseEntity implements AggregateRoot {
  private name: string;
  private document: string;
  private address: Address;
  private items: InvoiceItem[];

  constructor(props: InvoiceProps) {
    super(props.id, props.createdAt);
    this.name = props.name;
    this.document = props.document;
    this.address = props.address;
    this.items = props.items;
    this.validate();
  }

  private validate() {
    if (this.items.length === 0) {
      throw Error("Invoice items must have at least one item");
    }
  }

  getName() {
    return this.name;
  }

  getDocument() {
    return this.document;
  }

  getAddress() {
    return this.address;
  }

  getItems() {
    return this.items;
  }

  getTotal() {
    let total = 0;
    for (const item of this.items) {
      total += item.getPrice();
    }
    return total;
  }
}
