import Product from "./product.entity";

export default interface ProductRepositoryInterface {
  add: (product: Product) => {}
}