import { ClientAdmFacadeFactory } from "@/modules/client-adm/factory";
import { InvoiceFacadeFactory } from "@/modules/invoice/factory";
import { PaymentFacadeFactory } from "@/modules/payment/factory";
import { ProductAdmFacadeFactory } from "@/modules/product-adm/factory";
import { StoreCatalogFacadeFactory } from "@/modules/store-catalog/factory";
import { OrderRepository } from "@/modules/checkout/repository";
import { PlaceOrderUsecase } from "@/modules/checkout/usecase/place-order";

export default class PlaceOrderUsecaseFactory {
  static create(): PlaceOrderUsecase {
    const clientAdmFacade = ClientAdmFacadeFactory.create();
    const productAdmFacade = ProductAdmFacadeFactory.create();
    const storeCatalogFacade = StoreCatalogFacadeFactory.create();
    const invoiceFacade = InvoiceFacadeFactory.create();
    const paymentFacade = PaymentFacadeFactory.create();
    const orderRepository = new OrderRepository();

    return new PlaceOrderUsecase(
      clientAdmFacade,
      productAdmFacade,
      storeCatalogFacade,
      invoiceFacade,
      paymentFacade,
      orderRepository
    );
  }
}
