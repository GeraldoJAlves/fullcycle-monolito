import { Id } from "@/modules/@shared/domain/value-object";
import { Product } from "@/modules/product-adm/domain";

export default interface ProductGatewayInterface {
  add: (product: Product) => Promise<void>;
  find: (id: Id) => Promise<Product>;
}
