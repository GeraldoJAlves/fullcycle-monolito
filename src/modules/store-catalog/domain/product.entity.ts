import { AggregateRoot, BaseEntity } from "@/modules/@shared/domain/entity";
import { Id } from "@/modules/@shared/domain/value-object";

type ProductProps = {
  id: Id;
  name: string;
  description: string;
  salesPrice: number;
};

export default class Product extends BaseEntity implements AggregateRoot {
  private name: string;
  private description: string;
  private salesPrice: number;

  constructor(props: ProductProps) {
    super(props.id);
    this.name = props.name;
    this.description = props.description;
    this.salesPrice = props.salesPrice;
  }

  getName() {
    return this.name;
  }

  getDescription() {
    return this.description;
  }

  getSalesPrice() {
    return this.salesPrice;
  }
}
