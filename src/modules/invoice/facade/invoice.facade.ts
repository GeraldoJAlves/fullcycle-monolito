import { FindInvoiceUsecase } from "@/modules/invoice/usecase/find-invoice";
import { GenerateInvoiceUsecase } from "@/modules/invoice/usecase/generate-invoice";
import InvoiceFacadeInterface, {
  FindInvoiceFacadeInputDTO,
  FindInvoiceFacadeOutputDTO,
  GenerateInvoiceFacadeInputDTO,
  GenerateInvoiceFacadeOutputDTO,
} from "./invoice.facade.interface";

export default class InvoiceFacade implements InvoiceFacadeInterface {
  constructor(
    private readonly findInvoiceUsecase: FindInvoiceUsecase,
    private readonly generateInvoiceUsecase: GenerateInvoiceUsecase
  ) {}
  generate(
    input: GenerateInvoiceFacadeInputDTO
  ): Promise<GenerateInvoiceFacadeOutputDTO> {
    return this.generateInvoiceUsecase.execute(input);
  }

  find(input: FindInvoiceFacadeInputDTO): Promise<FindInvoiceFacadeOutputDTO> {
    return this.findInvoiceUsecase.execute(input);
  }
}
