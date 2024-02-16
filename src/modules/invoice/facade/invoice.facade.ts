import { FindInvoiceUsecase } from "../usecase/find-invoice";
import InvoiceFacadeInterface, {
  FindInvoiceFacadeInputDTO,
  FindInvoiceFacadeOutputDTO,
} from "./invoice.facade.interface";

export default class InvoiceFacade implements InvoiceFacadeInterface {
  constructor(private readonly findInvoiceUsecase: FindInvoiceUsecase) {}

  find(input: FindInvoiceFacadeInputDTO): Promise<FindInvoiceFacadeOutputDTO> {
    return this.findInvoiceUsecase.execute(input);
  }
}
