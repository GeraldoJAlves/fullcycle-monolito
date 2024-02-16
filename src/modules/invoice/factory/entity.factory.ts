import { Id } from "@/modules/@shared/domain/value-object";
import { Invoice, InvoiceItem } from "@/modules/invoice/domain";
import { Address } from "@/modules/invoice/value-object";

type InvoiceFactoryProps = {
  id?: string;
  name: string;
  document: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
  items: {
    id?: string;
    name: string;
    price: number;
  }[];
  createdAt?: Date;
};

export default class InvoiceFactory {
  static create(props: InvoiceFactoryProps) {
    const items: InvoiceItem[] = [];
    for (const item of props.items) {
      items.push(
        new InvoiceItem({
          id: new Id(item.id),
          name: item.name,
          price: item.price,
        })
      );
    }

    const address = new Address(
      props.street,
      props.number,
      props.complement,
      props.city,
      props.state,
      props.zipCode
    );

    return new Invoice({
      id: new Id(props.id),
      name: props.name,
      document: props.document,
      address,
      items,
      createdAt: props.createdAt
    });
  }
}
