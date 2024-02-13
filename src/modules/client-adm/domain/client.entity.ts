import { AggregateRoot, BaseEntity } from "@/modules/@shared/domain/entity";
import { Id } from "@/modules/@shared/domain/value-object";

type ClientProps = {
  id?: Id;
  name: string;
  email: string;
  address: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export default class Client extends BaseEntity implements AggregateRoot {
  private name: string;
  private email: string;
  private address: string;

  constructor(props: ClientProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this.name = props.name;
    this.email = props.email;
    this.address = props.address;
  }

  getName() {
    return this.name;
  }

  getEmail() {
    return this.email;
  }

  getAddress() {
    return this.address;
  }
}
