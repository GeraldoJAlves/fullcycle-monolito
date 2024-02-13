import {
  ProductAdmFacade,
  ProductAdmFacadeInterface,
} from "@/modules/product-adm/facade";
import { ProductRepository } from "@/modules/product-adm/repository";
import { AddProductUsecase } from "@/modules/product-adm/usecase/add-product";
import { CheckStockUsecase } from "../usecase/check-stock";

export default class ProductAdmFacadeFactory {
  public static create(): ProductAdmFacadeInterface {
    const repository = new ProductRepository();
    const addProductUseCase = new AddProductUsecase(repository);
    const checkStock = new CheckStockUsecase(repository);
    return new ProductAdmFacade(addProductUseCase, checkStock);
  }
}
