import { ProcessPaymentUsecase } from "../usecase/process-payment";
import {
  PaymentFacadeInterface,
  ProcessPaymentFacadeInputDTO,
  ProcessPaymentFacadeOutputDTO,
} from "./payment.facade.interface";

export default class PaymentFacade implements PaymentFacadeInterface {
  constructor(private readonly processPaymentUsecase: ProcessPaymentUsecase) {}

  process(
    input: ProcessPaymentFacadeInputDTO
  ): Promise<ProcessPaymentFacadeOutputDTO> {
    return this.processPaymentUsecase.execute(input);
  }
}
