import { Product } from "@/modules/product-adm/domain";
import { AddProductInputDTO, AddProductOutputDTO } from "./add-product.dto";
import { ProductGatewayInterface } from "@/modules/product-adm/gateway";

export default class AddProductUsecase {
  constructor(private repository: ProductGatewayInterface) {}

  async execute(input: AddProductInputDTO): Promise<AddProductOutputDTO> {
    const product = new Product({
      name: input.name,
      description: input.description,
      purchasePrice: input.purchasePrice,
      stock: input.stock,
    });

    await this.repository.add(product);

    return {
      id: product.getId().getValue(),
      name: product.getName(),
      description: product.getDescription(),
      purchasePrice: product.getPurchasePrice(),
      stock: product.getStock(),
      createdAt: product.getCreatedAt(),
      updatedAt: product.getUpdatedAt(),
    };
  }
}
