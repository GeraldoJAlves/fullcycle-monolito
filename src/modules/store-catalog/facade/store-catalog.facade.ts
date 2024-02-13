import { UsecaseInterface } from "@/modules/@shared/usecase";
import {
  FindAllStoreCatalogFacadeInputDTO,
  FindAllStoreCatalogFacadeOutputDTO,
  FindStoreCatalogFacadeInputDTO,
  FindStoreCatalogFacadeOutputDTO,
  StoreCatalogFacadeInterface,
} from "./store-catalog.facade.interface";

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {
  constructor(
    private readonly findProductUsecase: UsecaseInterface,
    private readonly findAllProductUsecase: UsecaseInterface
  ) {}

  async find(
    input: FindStoreCatalogFacadeInputDTO
  ): Promise<FindStoreCatalogFacadeOutputDTO> {
    return await this.findProductUsecase.execute(input);
  }

  async findAll(
    input: FindAllStoreCatalogFacadeInputDTO
  ): Promise<FindAllStoreCatalogFacadeOutputDTO> {
    return await this.findAllProductUsecase.execute(input);
  }
}
