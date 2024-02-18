import { UsecaseInterface } from "@/modules/@shared/usecase";
import { ClientAdmFacadeInterface } from "@/modules/client-adm/facade";
import {
  PlaceOrderUsecaseInputDTO,
  PlaceOrderUsecaseOutputDTO,
} from "./place-order.dto";
import { ProductAdmFacadeInterface } from "@/modules/product-adm/facade";

export default class PlaceOrderUsecase implements UsecaseInterface {
  constructor(
    private readonly clientAdmFacade: ClientAdmFacadeInterface,
    private readonly productAdmFacade: ProductAdmFacadeInterface
  ) {}

  async execute(
    input: PlaceOrderUsecaseInputDTO
  ): Promise<PlaceOrderUsecaseOutputDTO> {
    const client = await this.clientAdmFacade.find({ id: input.clientId });

    if (input.products.length === 0) {
      throw new Error("Must provide at least one product")
    }

    await this.validateProductsStock(input.products);

    return {
      id: "",
      invoiceId: "",
      products: [],
      status: "",
      total: 10,
    };
  }

  private async validateProductsStock(products: { productId: string }[]) {
    for (const product of products) {
      const productStock = await this.productAdmFacade.checkStock({ id: product.productId })
      if (productStock.stock <= 0) {
        throw new Error(`Product ${productStock.id} out of stock`)
      }
    }
  }
}
