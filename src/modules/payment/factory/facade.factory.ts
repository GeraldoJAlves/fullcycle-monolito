import { PaymentFacade } from "@/modules/payment/facacde";
import { TransactionRepository } from "@/modules/payment/repository";
import { ProcessPaymentUsecase } from "@/modules/payment/usecase/process-payment";

export default class PaymentFacadeFactory {
  static create() {
    const repository = new TransactionRepository();
    const processPaymentUsecase = new ProcessPaymentUsecase(repository);
    return new PaymentFacade(processPaymentUsecase);
  }
}
