import OrderFactory from "./entity.factory";

describe("Order factory", () => {
  it("should create an order", () => {
    const input = {
      id: "o1",
      client: {
        id: "c1",
        name: "John",
        email: "email@email.com",
        address: "street 1, California",
      },
      products: [
        { id: "p1", name: "ball", description: "blue", salesPrice: 7.66 },
        { id: "p2", name: "ball", description: "red", salesPrice: 9.66 },
      ],
    };
    const order = OrderFactory.create(input);

    expect(order.getClient().getId().getValue()).toBe(input.client.id);
    expect(order.getClient().getName()).toBe(input.client.name);
    expect(order.getClient().getEmail()).toBe(input.client.email);
    expect(order.getClient().getAddress()).toBe(input.client.address);
    expect(order.getProducts().length).toBe(2);
    expect(order.getProducts()[0].getId().getValue()).toBe(
      input.products[0].id
    );
    expect(order.getProducts()[0].getName()).toBe(input.products[0].name);
    expect(order.getProducts()[0].getDescription()).toBe(
      input.products[0].description
    );
    expect(order.getProducts()[0].getSalesPrice()).toBe(
      input.products[0].salesPrice
    );
    expect(order.getProducts()[1].getId().getValue()).toBe(
      input.products[1].id
    );
    expect(order.getProducts()[1].getName()).toBe(input.products[1].name);
    expect(order.getProducts()[1].getDescription()).toBe(
      input.products[1].description
    );
    expect(order.getProducts()[1].getSalesPrice()).toBe(
      input.products[1].salesPrice
    );
  });

  it("should throw if Order throws", () => {
    const input = {
      id: "o1",
      client: {
        id: "c1",
        name: "John",
        email: "email@email.com",
        address: "street 1, California",
      },
      products: [],
    };
    expect(() => {
      OrderFactory.create(input);
    }).toThrow("Order must have at least one product");
  });
});
