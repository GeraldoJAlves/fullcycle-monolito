import { Address, Id } from "@/modules/@shared/domain/value-object";
import Client from "./client.entity";
import Order from "./order.entity";
import Product from "./product.entity";

describe("Order entity", () => {
  it("should create an order", () => {
    const client = new Client({
      name: "John",
      email: "email@email.com",
      address: new Address(
        "street 1",
        "1",
        "",
        "city A",
        "UC",
        "999999"
      ),
    });

    const products = [
      new Product({ name: "ball", description: "blue", salesPrice: 7.66 }),
      new Product({ name: "ball", description: "red", salesPrice: 9.66 }),
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
    expect(order.getTotal()).toEqual(17.32);
  });

  it("should aprove an order", () => {
    const client = new Client({
      name: "John",
      email: "email@email.com",
      address: new Address(
        "street 1",
        "1",
        "",
        "city A",
        "UC",
        "999999"
      ),
    });

    const products = [
      new Product({ name: "ball", description: "blue", salesPrice: 7.66 }),
      new Product({ name: "ball", description: "red", salesPrice: 9.66 }),
    ];

    const input = {
      client,
      products,
    };

    const order = new Order(input);

    order.approve();

    expect(order.getStatus()).toEqual("approved");
  });

  it("should throw when order is created without products", () => {
    const client = new Client({
      name: "John",
      email: "email@email.com",
      address: new Address(
        "street 1",
        "1",
        "",
        "city A",
        "UC",
        "999999"
      ),
    });

    const input = {
      client,
      products: []
    };

    expect(() => {
      new Order(input);
    }).toThrow("Order must have at least one product");
  });
});
