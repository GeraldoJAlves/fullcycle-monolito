import { AggregateRoot, BaseEntity } from "@/modules/@shared/domain/entity";
import { Id } from "@/modules/@shared/domain/value-object";

export enum StatusTypes {
  PENDING = "PENDING",
  DECLINED = "DECLINED",
  APPROVED = "APPROVED",
}

type TransactionProps = {
  id?: Id;
  amount: number;
  orderId: string;
  status?: StatusTypes;
  createdAt?: Date;
  updatedAt?: Date;
};

export default class Transaction extends BaseEntity implements AggregateRoot {
  private amount: number;
  private orderId: string;
  private status: StatusTypes;
  constructor(props: TransactionProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this.amount = props.amount;
    this.orderId = props.orderId;
    this.status = props.status || StatusTypes.PENDING;
    this.validate();
  }

  public validate() {
    if (this.amount <= 0) {
      throw new Error("Amount must be greater than 0");
    }
  }

  private approve() {
    this.status = StatusTypes.APPROVED;
  }

  private decline() {
    this.status = StatusTypes.DECLINED;
  }

  proccess() {
    if (this.amount <= 100) {
      return this.decline();
    }

    this.approve();
  }

  getAmount() {
    return this.amount;
  }

  getOrderId() {
    return this.orderId;
  }

  getStatus() {
    return this.status;
  }
}
