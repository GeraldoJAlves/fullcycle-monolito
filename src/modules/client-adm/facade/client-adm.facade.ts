import { AddClientUsecase } from "@/modules/client-adm/usecase/add-client";
import { FindClientUsecase } from "@/modules/client-adm/usecase/find-client";
import ClientAdmFacadeInterface, {
  AddClientFacadeInputDTO,
  AddClientFacadeOutputDTO,
  FindClientFacadeInputDTO,
  FindClientFacadeOutputDTO,
} from "./client-adm.facade.interface";

export default class ClientAdmFacade implements ClientAdmFacadeInterface {
  constructor(
    private readonly addClientUsecase: AddClientUsecase,
    private readonly findClientUsecase: FindClientUsecase
  ) {}

  add(
    input: AddClientFacadeInputDTO
  ): Promise<AddClientFacadeOutputDTO> {
    return this.addClientUsecase.execute(input)
  }

  find(
    input: FindClientFacadeInputDTO
  ): Promise<FindClientFacadeOutputDTO> {
    return this.findClientUsecase.execute(input)
  }
}
