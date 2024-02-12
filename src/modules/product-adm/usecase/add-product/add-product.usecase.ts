import { Product, ProductRepositoryInterface } from "@/modules/product-adm/domain";
import { AddProductInputDTO, AddProductOutputDTO } from "./add-product.dto";

export default class AddProductUsecase {
  constructor(private repository: ProductRepositoryInterface) { }

  async execute(input: AddProductInputDTO): Promise<AddProductOutputDTO> {
    const product = new Product({
      name: input.name,
      description: input.description,
      purchasePrice: input.purchasePrice,
      stock: input.stock
    })

    await this.repository.add(product)

    return {
      id: product.getId().getId(),
      name: product.getName(),
      description: product.getDescription(),
      purchasePrice: product.getPurchasePrice(),
      stock: product.getStock(),
      createdAt: product.getCreatedAt(),
      updatedAt: product.getUpdatedAt()
    }
  }
}