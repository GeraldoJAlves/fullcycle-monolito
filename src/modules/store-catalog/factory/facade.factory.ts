import {StoreCatalogFacade} from "@/modules/store-catalog/facade";
import { ProductRepository } from "@/modules/store-catalog/repository";
import { FindAllProductsUsecase } from "@/modules/store-catalog/usecase/find-all-products";
import { FindProductUsecase } from "@/modules/store-catalog/usecase/find-product";

export default class StoreCatalogFacadeFactory {
  static create() {
    const repository = new ProductRepository();
    const findProductUsecase = new FindProductUsecase(repository);
    const findAllProductUsecase = new FindAllProductsUsecase(repository);

    return new StoreCatalogFacade(findProductUsecase, findAllProductUsecase);
  }
}
