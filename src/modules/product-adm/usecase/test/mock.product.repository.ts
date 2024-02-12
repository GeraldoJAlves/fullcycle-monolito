import { Id } from "@/modules/@shared/domain/value-object";
import { Product } from "@/modules/product-adm/domain";
import { ProductGatewayInterface } from "@/modules/product-adm/gateway";

const productBall = new Product({
  name: "bike",
  description: "blue bike",
  purchasePrice: 999.98,
  stock: 9,
});

export default class ProductRepositorySpy implements ProductGatewayInterface {
  inputAdd: Product | undefined;
  inputFind: Id | undefined;
  outputFind = productBall;

  async add(product: Product) {
    this.inputAdd = product;
  }

  async find(id: Id) {
    this.inputFind = id;
    return Promise.resolve(this.outputFind);
  }
}
