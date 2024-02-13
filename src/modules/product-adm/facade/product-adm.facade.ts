import { UsecaseInterface } from "@/modules/@shared/usecase";
import {
  AddProductFacadeInputDTO,
  AddProductFacadeOutputDTO,
  CheckStockFacadeInputDTO,
  CheckStockFacadeOutputDTO,
  ProductAdmFacadeInterface,
} from "./product-adm.facade.interface";

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
  constructor(
    private addProductUsecase: UsecaseInterface,
    private checkStockUsecase: UsecaseInterface
  ) {}

  async addProduct(
    input: AddProductFacadeInputDTO
  ): Promise<AddProductFacadeOutputDTO> {
    return await this.addProductUsecase.execute(input);
  }

  checkStock(
    input: CheckStockFacadeInputDTO
  ): Promise<CheckStockFacadeOutputDTO> {
    throw new Error("Method not implemented.");
  }
}
