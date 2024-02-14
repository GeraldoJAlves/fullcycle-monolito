import { StatusTypes, Transaction } from "../../domain";
import { TransactionGatewayInterface } from "../../gateway";
import ProcessPaymentUsecase from "./process-payment.usecase";

class TransactionRepository implements TransactionGatewayInterface {
  save(transaction: Transaction): Promise<Transaction> {
    throw new Error("Method not implemented.");
  }
}

describe("ProcessPayment usecase", () => {
  it("should call PaymentRepository", async () => {
    const repository = new TransactionRepository();
    const usecase = new ProcessPaymentUsecase(repository);

    const transaction = new Transaction({
      orderId: "o-111",
      amount: 130,
    });

    const repositorySpy = jest
      .spyOn(repository, "save")
      .mockResolvedValueOnce(transaction);

    const response = await usecase.execute({
      orderId: transaction.getOrderId(),
      amount: transaction.getAmount(),
    });

    expect(repositorySpy).toHaveBeenCalled();
    expect(response.orderId).toBe(transaction.getOrderId());
    expect(response.amount).toBe(transaction.getAmount());
    expect(response.status).toBe(StatusTypes.APPROVED);
  });

  it("should throw if PaymentRepository throws", async () => {
    const repository = new TransactionRepository();
    const usecase = new ProcessPaymentUsecase(repository);

    jest
      .spyOn(repository, "save")
      .mockRejectedValueOnce(new Error("payment fail"));

    await expect(async () => {
      await usecase.execute({
        orderId: "99",
        amount: 110,
      });
    }).rejects.toThrow("payment fail");
  });
});
