import { UsecaseInterface } from "@/modules/@shared/usecase";
import {
  AddProductFacadeInputDTO,
  AddProductFacadeOutputDTO,
  ProductAdmFacadeInterface,
} from "./product-adm.facade.interface";

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
  constructor(private addProductUsecase: UsecaseInterface) {}

  async addProduct(
    input: AddProductFacadeInputDTO
  ): Promise<AddProductFacadeOutputDTO> {
    return await this.addProductUsecase.execute(input);
  }
}
