import { Transaction} from "@/modules/payment/domain";

export default interface PaymentGatewayInterface {
  save(transaction: Transaction): Promise<Transaction>;
}
