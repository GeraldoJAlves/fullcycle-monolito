import { UsecaseInterface } from "@/modules/@shared/usecase";
import { ProductRepositoryInterface } from "@/modules/product-adm/domain";
import { CheckStockInputDTO, CheckStockOutputDTO } from "./check-stock.dto";
import { Id } from "@/modules/@shared/domain/value-object";

export default class CheckStockUsecase implements UsecaseInterface {
  constructor(private repository: ProductRepositoryInterface) {}

  async execute(input: CheckStockInputDTO): Promise<CheckStockOutputDTO> {
    const product = await this.repository.find(new Id(input.id));

    return {
      id: product.getId().getValue(),
      stock: product.getStock(),
    };
  }
}
