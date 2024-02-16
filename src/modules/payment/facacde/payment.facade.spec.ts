import { StatusTypes } from "@/modules/payment/domain";
import { TransactionRepository } from "@/modules/payment/repository";
import { ProcessPaymentUsecase } from "@/modules/payment/usecase/process-payment";
import PaymentFacade from "./payment.facade";

const makeSut = () => {
  const repository = new TransactionRepository();
  const processPaymentUsecase = new ProcessPaymentUsecase(repository);

  const sut = new PaymentFacade(processPaymentUsecase);

  return {
    sut,
    processPaymentUsecase,
  };
};

describe("Payment facade", () => {
  describe("process()", () => {
    it("should call ProcessPaymentUsecase", async () => {
      const { sut, processPaymentUsecase } = makeSut();

      const transaction = {
        transactionId: "1",
        orderId: "011",
        amount: 190,
        status: StatusTypes.APPROVED,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const processPaymentUsecaseSpy = jest
        .spyOn(processPaymentUsecase, "execute")
        .mockResolvedValueOnce(transaction);

      const response = await sut.process({
        orderId: transaction.orderId,
        amount: transaction.amount,
      });

      expect(processPaymentUsecaseSpy).toHaveBeenCalled();
      expect(response).toEqual(transaction);
    });

    it("should throw ProcessPaymentUsecase if throws", async () => {
      const { sut, processPaymentUsecase } = makeSut();

      jest
        .spyOn(processPaymentUsecase, "execute")
        .mockRejectedValueOnce(new Error("error model"));

      await expect(async () => {
        await sut.process({
          orderId: "011",
          amount: 190,
        });
      }).rejects.toThrow("error model");
    });
  });
});
