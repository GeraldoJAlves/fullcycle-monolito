import { Sequelize } from "sequelize-typescript";
import { Address, Id } from "@/modules/@shared/domain/value-object";
import { Client, Order, Product } from "@/modules/checkout/domain";
import OrderRepository from "./order.repository";
import OrderModel from "./order.model";

describe("Order repository", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    await sequelize.addModels([OrderModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should save an order", async () => {
    const client = new Client({
      name: "John",
      email: "email@email.com",
      address: new Address("street 1", "1", "", "city A", "UC", "999999"),
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

    const repository = new OrderRepository();

    const invoiceId = new Id();
    await repository.save(order, invoiceId);

    const orderDb = await OrderModel.findOne({
      where: { id: order.getId().getValue() },
    });

    expect(orderDb?.id).toBe(order.getId().getValue())
    expect(orderDb?.invoiceId).toBe(invoiceId.getValue())
    expect(orderDb?.clientId).toBe(order.getClient().getId().getValue())
    expect(orderDb?.status).toBe(order.getStatus())
  });
});
