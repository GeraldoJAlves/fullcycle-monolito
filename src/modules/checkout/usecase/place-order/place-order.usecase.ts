import { UsecaseInterface } from "@/modules/@shared/usecase";
import {
  PlaceOrderUsecaseInputDTO,
  PlaceOrderUsecaseOutputDTO,
} from "./place-order.dto";
import { ClientAdmFacade } from "@/modules/client-adm/facade";

export default class PlaceOrderUsecase implements UsecaseInterface {
  constructor(private readonly clientFacadeAdm: ClientAdmFacade) {}

  async execute(
    input: PlaceOrderUsecaseInputDTO
  ): Promise<PlaceOrderUsecaseOutputDTO> {
    const client = await this.clientFacadeAdm.find({ id: input.clientId });

    return {
      id: "",
      invoiceId: "",
      products: [],
      status: "",
      total: 10,
    };
  }
}
