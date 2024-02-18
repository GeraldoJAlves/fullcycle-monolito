import { UsecaseInterface } from "@/modules/@shared/usecase";
import { ClientAdmFacadeInterface } from "@/modules/client-adm/facade";
import { StoreCatalogFacadeInterface } from "@/modules/store-catalog/facade";
import {
  PlaceOrderUsecaseInputDTO,
  PlaceOrderUsecaseOutputDTO,
} from "./place-order.dto";

export default class PlaceOrderUsecase implements UsecaseInterface {
  constructor(
    private readonly clientAdmFacade: ClientAdmFacadeInterface,
    private readonly storeCatalogFacade: StoreCatalogFacadeInterface
  ) {}

  async execute(
    input: PlaceOrderUsecaseInputDTO
  ): Promise<PlaceOrderUsecaseOutputDTO> {
    const client = await this.clientAdmFacade.find({ id: input.clientId });

    if (input.products.length === 0) {
      throw new Error("Must provide at least one product")
    }

    const products = await this.getStoreCatalogProducts(input.products);

    return {
      id: "",
      invoiceId: "",
      products: [],
      status: "",
      total: 10,
    };
  }

  private async getStoreCatalogProducts(products: { productId: string }[]) {
    const storeCatalogProducts = [];

    for (const product of products) {
      storeCatalogProducts.push(
        await this.storeCatalogFacade.find({ id: product.productId })
      );
    }
    return storeCatalogProducts;
  }
}
