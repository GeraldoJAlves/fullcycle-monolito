import { UsecaseInterface } from "@/modules/@shared/usecase";
import { ClientAdmFacadeInterface } from "@/modules/client-adm/facade";
import { ProductAdmFacadeInterface } from "@/modules/product-adm/facade";
import { StoreCatalogFacadeInterface } from "@/modules/store-catalog/facade";
import { Client, Order, Product } from "@/modules/checkout/domain";
import {
  PlaceOrderUsecaseInputDTO,
  PlaceOrderUsecaseOutputDTO,
} from "./place-order.dto";
import { Id } from "@/modules/@shared/domain/value-object";
import InvoiceFacadeInterface, { GenerateInvoiceFacadeOutputDTO } from "@/modules/invoice/facade/invoice.facade.interface";

export default class PlaceOrderUsecase implements UsecaseInterface {
  constructor(
    private readonly clientAdmFacade: ClientAdmFacadeInterface,
    private readonly productAdmFacade: ProductAdmFacadeInterface,
    private readonly storeCatalogFacade: StoreCatalogFacadeInterface,
    private readonly invoiceFacade: InvoiceFacadeInterface
  ) {}

  async execute(
    input: PlaceOrderUsecaseInputDTO
  ): Promise<PlaceOrderUsecaseOutputDTO> {
    const client = await this.getClient(input.clientId);

    if (input.products.length === 0) {
      throw new Error("Must provide at least one product");
    }

    await this.validateProductsStock(input.products);

    const products = await this.getProducts(input.products);

    const invoice = await this.generateInvoice(client, products)

    const order = new Order({
      client,
      products,
    });

    return {
      id: order.getId().getValue(),
      invoiceId: "",
      products: input.products,
      status: order.getStatus(),
      total: order.getTotal(),
    };
  }

  private async validateProductsStock(
    products: { productId: string }[]
  ): Promise<void> {
    for (const product of products) {
      const productStock = await this.productAdmFacade.checkStock({
        id: product.productId,
      });
      if (productStock.stock <= 0) {
        throw new Error(`Product ${productStock.id} out of stock`);
      }
    }
  }

  private async getClient(id: string) {
    const client = await this.clientAdmFacade.find({ id });
    return new Client({
      id: new Id(client.id),
      name: client.name,
      email: client.email,
      address: client.address,
    });
  }

  private async getProducts(
    products: { productId: string }[]
  ): Promise<Product[]> {
    const storeCatalogProducts: Product[] = [];
    for (const product of products) {
      const productStock = await this.storeCatalogFacade.find({
        id: product.productId,
      });
      storeCatalogProducts.push(
        new Product({
          id: new Id(productStock.id),
          name: productStock.name,
          description: productStock.description,
          salesPrice: productStock.salesPrice,
        })
      );
    }
    return storeCatalogProducts;
  }

  private async generateInvoice(client: Client, products: Product[]): Promise<GenerateInvoiceFacadeOutputDTO> {
    const invoiceInput = {
      name: client.getName(),
      document: "doc 1",
      street: client.getAddress(),
      number: "1",
      complement: "",
      city: "city",
      state: "",
      zipCode: "",
      items: products.map((product) => ({
        id: product.getId().getValue(),
        name: product.getName(),
        price: product.getSalesPrice(),
      })),
    };
    return await this.invoiceFacade.generate(invoiceInput);
  }
}
