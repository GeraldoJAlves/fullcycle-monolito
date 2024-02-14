import { Transaction} from "@/modules/payment/domain";

export default interface TransactionGatewayInterface {
  save(transaction: Transaction): Promise<Transaction>;
}
