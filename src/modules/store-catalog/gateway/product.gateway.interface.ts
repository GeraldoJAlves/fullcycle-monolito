import { Id } from "@/modules/@shared/domain/value-object";
import { Product } from "../domain";

export default interface ProductGatewayInterface {
  findAll(): Promise<Product[]>;
  find(id: Id): Promise<Product>;
}
