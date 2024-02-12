import { Id } from "@/modules/@shared/domain/value-object";
import { Product } from "@/modules/product-adm/domain";
import { ProductGatewayInterface } from "@/modules/product-adm/gateway";
import { ProductModel } from "./product.model";

export default class ProductRepository implements ProductGatewayInterface {
  async add(product: Product) {
    await ProductModel.create({
      id: product.getId().getValue(),
      name: product.getName(),
      description: product.getDescription(),
      purchasePrice: product.getPurchasePrice(),
      stock: product.getStock(),
      createdAt: product.getCreatedAt(),
      updatedAt: product.getUpdatedAt(),
    });
  }
  async find(id: Id) {
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
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    });
  }
}
