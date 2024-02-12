import { Id } from "@/modules/@shared/domain/value-object";
import Product from "./product.entity";

export default interface ProductRepositoryInterface {
  add: (product: Product) => Promise<void>;
  find: (id: Id) => Promise<Product>;
}
