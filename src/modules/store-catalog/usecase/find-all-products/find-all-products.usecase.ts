import { UsecaseInterface } from "@/modules/@shared/usecase";
import { FindAllProductsInputDTO, FindAllProductsOutputDTO } from "./find-all-products.dto";
import { ProductGatewayInterface } from "@/modules/store-catalog/gateway";

export default class FindAllProductsUsecase implements UsecaseInterface {

  constructor (private repository: ProductGatewayInterface) {}

  async execute(input: FindAllProductsInputDTO): Promise<FindAllProductsOutputDTO> {
    const products = await this.repository.findAll()

    return {
      products: products.map((product) => ({
        id: product.getId().getValue(),
        name: product.getName(),
        description: product.getDescription(),
        salesPrice: product.getSalesPrice(),
      }))
    }
  }
}