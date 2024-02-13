import { Id } from "@/modules/@shared/domain/value-object";
import { Product } from "../domain";
import { ProductGatewayInterface } from "../gateway";
import ProductModel from "./product.model";

export default class ProductRepository implements ProductGatewayInterface {
  async findAll(): Promise<Product[]> {
    const products = await ProductModel.findAll();

    return products.map(
      (product) =>
        new Product({
          id: new Id(product.id),
          name: product.name,
          description: product.description,
          salesPrice: product.salesPrice,
        })
    );
  }

  async find(id: Id): Promise<Product> {
    const product = await ProductModel.findOne({
      where: { id: id.getValue() },
    });

    if (!product) {
      throw new Error(`Product with id ${id.getValue()} not found`);
    }

    return new Product({
      id: new Id(product.id),
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    });
  }
}
