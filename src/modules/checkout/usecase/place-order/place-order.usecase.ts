import { UsecaseInterface } from "@/modules/@shared/usecase";
import { ClientAdmFacadeInterface } from "@/modules/client-adm/facade";
import { ProductAdmFacadeInterface } from "@/modules/product-adm/facade";
import { StoreCatalogFacadeInterface } from "@/modules/store-catalog/facade";
import { OrderFactory } from "@/modules/checkout/factory"
import {
  PlaceOrderUsecaseInputDTO,
  PlaceOrderUsecaseOutputDTO,
} from "./place-order.dto";

export default class PlaceOrderUsecase implements UsecaseInterface {
  constructor(
    private readonly clientAdmFacade: ClientAdmFacadeInterface,
    private readonly productAdmFacade: ProductAdmFacadeInterface,
    private readonly storeCatalogFacade: StoreCatalogFacadeInterface
  ) {}

  async execute(
    input: PlaceOrderUsecaseInputDTO
  ): Promise<PlaceOrderUsecaseOutputDTO> {
    const client = await this.clientAdmFacade.find({ id: input.clientId });

    if (input.products.length === 0) {
      throw new Error("Must provide at least one product");
    }

    await this.validateProductsStock(input.products);

    const products = await this.getStoreCatalogProducts(input.products);

    const order = OrderFactory.create({
      client: {
        id: client.id,
        name: client.name,
        email: client.email,
        address: client.address,
      },
      products: products.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice,
      })),
    });

    return {
      id: order.getId().getValue(),
      invoiceId: "",
      products: input.products,
      status: order.getStatus(),
      total: order.getTotal(),
    };
  }

  private async validateProductsStock(products: { productId: string }[]) {
    for (const product of products) {
      const productStock = await this.productAdmFacade.checkStock({
        id: product.productId,
      });
      if (productStock.stock <= 0) {
        throw new Error(`Product ${productStock.id} out of stock`);
      }
    }
  }

  private async getStoreCatalogProducts(products: { productId: string }[]) {
    const storeCatalogProducts = [];
    for (const product of products) {
      const productStock = await this.storeCatalogFacade.find({
        id: product.productId,
      });
      storeCatalogProducts.push(productStock);
    }
    return storeCatalogProducts;
  }
}
