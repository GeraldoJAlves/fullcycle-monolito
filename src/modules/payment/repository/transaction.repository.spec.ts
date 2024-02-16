import { Sequelize } from "sequelize-typescript";
import { Transaction } from "@/modules/payment/domain";
import TransactionModel from "./transaction.model";
import TransactionRepository from "./transaction.repository";

describe("Transaction repository", () => {
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

    await sequelize.addModels([TransactionModel])
    await sequelize.sync()
  });

  afterEach(async () => {
    await sequelize.close();
  });

  describe("save()", () => {
    it("should save a transaction", async () => {
      const transaction = new Transaction({
        orderId: "o-11",
        amount: 20,
      });

      const repository = new TransactionRepository();

      const transactionResult = await repository.save(transaction);

      const transactionDb = await TransactionModel.findOne({
        where: {
          transactionId: transaction.getId().getValue(),
        },
      });

      expect(transactionDb).toBeDefined();
      expect(transactionDb?.transactionId).toBe(transaction.getId().getValue());
      expect(transactionDb?.orderId).toBe(transaction.getOrderId());
      expect(transactionDb?.amount).toBe(transaction.getAmount());
      expect(transactionDb?.status).toBe(transaction.getStatus());
      expect(transactionDb?.createdAt).toEqual(transaction.getCreatedAt());
      expect(transactionDb?.updatedAt).toEqual(transaction.getUpdatedAt());
      expect(transactionResult).toEqual(transaction);

      await TransactionModel.findOne();
    });
  });
});
