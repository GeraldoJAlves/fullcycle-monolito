import { UsecaseInterface } from "@/modules/@shared/usecase";
import { ProductGatewayInterface } from "@/modules/store-catalog/gateway";
import { FindProductInputDTO, FindProductOutputDTO } from "./find-product.dto";
import { Id } from "@/modules/@shared/domain/value-object";

export default class FindProductUsecase implements UsecaseInterface {
  constructor(private repository: ProductGatewayInterface) {}

  async execute(input: FindProductInputDTO): Promise<FindProductOutputDTO> {
    const product = await this.repository.find(new Id(input.id));

    return {
      id: product.getId().getValue(),
      name: product.getName(),
      description: product.getDescription(),
      salesPrice: product.getSalesPrice(),
    };
  }
}
