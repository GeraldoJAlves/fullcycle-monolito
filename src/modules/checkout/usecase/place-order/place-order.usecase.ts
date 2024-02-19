import { UsecaseInterface } from "@/modules/@shared/usecase";
import { Address, Id } from "@/modules/@shared/domain/value-object";
import { ClientAdmFacadeInterface } from "@/modules/client-adm/facade";
import { ProductAdmFacadeInterface } from "@/modules/product-adm/facade";
import { StoreCatalogFacadeInterface } from "@/modules/store-catalog/facade";
import { Client, Order, Product } from "@/modules/checkout/domain";
import { PaymentFacadeInterface } from "@/modules/payment/facade";
import {
  InvoiceFacadeInterface,
  GenerateInvoiceFacadeOutputDTO,
} from "@/modules/invoice/facade";
import {
  PlaceOrderUsecaseInputDTO,
  PlaceOrderUsecaseOutputDTO,
} from "./place-order.dto";

export default class PlaceOrderUsecase implements UsecaseInterface {
  constructor(
    private readonly clientAdmFacade: ClientAdmFacadeInterface,
    private readonly productAdmFacade: ProductAdmFacadeInterface,
    private readonly storeCatalogFacade: StoreCatalogFacadeInterface,
    private readonly invoiceFacade: InvoiceFacadeInterface,
    private readonly paymentFacade: PaymentFacadeInterface
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

    const order = new Order({
      client,
      products,
    });

    const payment = await this.paymentFacade.process({
      orderId: order.getId().getValue(),
      amount: order.getTotal(),
    });

    if (payment.status !== "approved") {
      throw new Error("Payment was not approved");
    }

    const invoice = await this.generateInvoice(client, products);

    return {
      id: order.getId().getValue(),
      invoiceId: invoice.id,
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
      address: new Address(
        client.address.street,
        client.address.number,
        client.address.complement,
        client.address.city,
        client.address.state,
        client.address.zipCode
      ),
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

  private async generateInvoice(
    client: Client,
    products: Product[]

  ): Promise<GenerateInvoiceFacadeOutputDTO> {
    const invoiceInput = {
      name: client.getName(),
      document: '',
      street: client.getAddress().getStreet(),
      number: client.getAddress().getNumber(),
      complement: client.getAddress().getComplement(),
      city: client.getAddress().getCity(),
      state: client.getAddress().getState(),
      zipCode: client.getAddress().getZipCode(),
      items: products.map((product) => ({
        id: product.getId().getValue(),
        name: product.getName(),
        price: product.getSalesPrice(),
      })),
    };
    return await this.invoiceFacade.generate(invoiceInput);
  }
}
