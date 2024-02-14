import { UsecaseInterface } from "@/modules/@shared/usecase";
import { Transaction } from "@/modules/payment/domain";
import { PaymentGatewayInterface } from "@/modules/payment/gateway";
import {
  ProcessPaymentInputDTO,
  ProcessPaymentOutputDTO,
} from "./process-payment.dto";

export default class ProcessPaymentUsecase implements UsecaseInterface {
  constructor(private readonly repository: PaymentGatewayInterface) {}

  async execute(
    input: ProcessPaymentInputDTO
  ): Promise<ProcessPaymentOutputDTO> {
    const transaction = new Transaction({
      orderId: input.orderId,
      amount: input.amount,
    });

    transaction.proccess();

    await this.repository.save(transaction);

    return {
      transactionId: transaction.getId().getValue(),
      orderId: transaction.getOrderId(),
      amount: transaction.getAmount(),
      status: transaction.getStatus(),
      createdAt: transaction.getCreatedAt(),
      updatedAt: transaction.getUpdatedAt(),
    };
  }
}
