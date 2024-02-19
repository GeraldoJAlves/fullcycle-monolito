import { Address, Id } from "@/modules/@shared/domain/value-object";
import { Product, Client, Order } from "@/modules/checkout/domain";

interface OrderFactoryProps {
  id?: string;
  client: {
    id: string;
    name: string;
    email: string;
    address: {
      street: string;
      number: string;
      complement: string;
      city: string;
      state: string;
      zipCode: string;
    };
  };
  products: {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
  }[];
}

export default class OrderFactory {
  static create(props: OrderFactoryProps) {
    const client = new Client({
      id: new Id(props.client.id),
      name: props.client.name,
      email: props.client.email,
      address: new Address(
        props.client.address.street,
        props.client.address.number,
        props.client.address.complement,
        props.client.address.city,
        props.client.address.state,
        props.client.address.zipCode
      ),
    });

    const products = props.products.map(
      (product) =>
        new Product({
          id: new Id(product.id),
          name: product.name,
          description: product.description,
          salesPrice: product.salesPrice,
        })
    );

    return new Order({
      client,
      products,
    });
  }
}
