import { PaymentFacade } from "../facacde";
import { TransactionRepository } from "../repository";
import { ProcessPaymentUsecase } from "../usecase/process-payment";

export default class PaymentFacadeFactory {
  static create() {
    const repository = new TransactionRepository();
    const processPaymentUsecase = new ProcessPaymentUsecase(repository);
    return new PaymentFacade(processPaymentUsecase);
  }
}
