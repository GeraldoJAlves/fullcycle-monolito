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

  addProduct(
    input: AddProductFacadeInputDTO
  ): Promise<AddProductFacadeOutputDTO> {
    return this.addProductUsecase.execute(input);
  }

  checkStock(
    input: CheckStockFacadeInputDTO
  ): Promise<CheckStockFacadeOutputDTO> {
    return this.checkStockUsecase.execute(input)
  }
}
