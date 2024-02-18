import { Id } from "@/modules/@shared/domain/value-object";
import Client from "./client.entity";
import Order from "./order.entity";
import Product from "./product.entity";

describe("Order entity", () => {
  it("should create an order", () => {
    const client = new Client({
      name: "John",
      email: "email@email.com",
      address: "street 1, California",
    });

    const products = [
      new Product({ name: "ball", description: "blue", salesPrice: 7.66 }),
    ];

    const input = {
      client,
      products,
    };

    const order = new Order(input);

    expect(order.getId()).toBeInstanceOf(Id);
    expect(order.getClient()).toEqual(client);
    expect(order.getProducts()).toEqual(products);
    expect(order.getStatus()).toEqual("pending");
  });
});
