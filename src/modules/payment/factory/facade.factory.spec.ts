import { Sequelize } from "sequelize-typescript";
import { TransactionModel } from "../repository";
import PaymentFacadeFactory from "./facade.factory";

describe("PaymentFacade factory", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      database: ":memory:",
      logging: false,
      sync: {
        force: true,
      },
    });

    await sequelize.addModels([TransactionModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should save a transaction", async () => {
    const facade = PaymentFacadeFactory.create();

    const response = await facade.process({
      orderId: "22",
      amount: 180,
    });

    const transactionDb = await TransactionModel.findOne({
      where: { transactionId: response.transactionId },
    });

    expect(transactionDb).toBeDefined();
    expect(response).toEqual({
      transactionId: response.transactionId,
      orderId: response.orderId,
      amount: response.amount,
      status: response.status,
      createdAt: response.createdAt,
      updatedAt: response.updatedAt,
    });
  });
});
