import { InvoiceFacade } from "@/modules/invoice/facade";
import { InvoiceRepository } from "@/modules/invoice/repository";
import { FindInvoiceUsecase } from "@/modules/invoice/usecase/find-invoice";
import { GenerateInvoiceUsecase } from "@/modules/invoice/usecase/generate-invoice";

export default class InvoiceFacadeFactory {
  private constructor() {}

  static create() {
    const repository = new InvoiceRepository();
    const findInvoiceUsecase = new FindInvoiceUsecase(repository);
    const generateInvoiceUsecase = new GenerateInvoiceUsecase(repository);
    return new InvoiceFacade(findInvoiceUsecase, generateInvoiceUsecase);
  }
}
