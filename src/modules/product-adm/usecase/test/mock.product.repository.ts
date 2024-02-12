import { Product, ProductRepositoryInterface } from "@/modules/product-adm/domain";


export default class ProductRepositorySpy implements ProductRepositoryInterface {
  inputAdd: Product | undefined;

  async add(product: Product) {
    this.inputAdd = product
  };
}