import { Transaction } from "@/modules/payment/domain";
import { TransactionGatewayInterface } from "@/modules/payment/gateway";
import TransactionModel from "./transaction.model";

export default class TransactionRepository
  implements TransactionGatewayInterface
{
  async save(transaction: Transaction): Promise<Transaction> {
    await TransactionModel.create({
      transactionId: transaction.getId().getValue(),
      orderId: transaction.getOrderId(),
      amount: transaction.getAmount(),
      status: transaction.getStatus(),
      createdAt: transaction.getCreatedAt(),
      updatedAt: transaction.getUpdatedAt(),
    });

    return transaction;
  }
}
