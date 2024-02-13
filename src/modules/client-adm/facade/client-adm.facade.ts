import ClientAdmFacadeInterface, {
  AddClientAdmFacadeInputDTO,
  AddClientAdmFacadeOutputDTO,
  FindClientAdmFacadeInputDTO,
  FindClientAdmFacadeOutputDTO,
} from "./client-adm.facade.interface";
import { AddClientUsecase } from "../usecase/add-client";
import { FindClientUsecase } from "../usecase/find-client";

export default class ClientAdmFacade implements ClientAdmFacadeInterface {
  constructor(
    private readonly addClientUsecase: AddClientUsecase,
    private readonly findClientUsecase: FindClientUsecase
  ) {}

  add(
    input: AddClientAdmFacadeInputDTO
  ): Promise<AddClientAdmFacadeOutputDTO> {
    return this.addClientUsecase.execute(input)
  }

  find(
    input: FindClientAdmFacadeInputDTO
  ): Promise<FindClientAdmFacadeOutputDTO> {
    return this.findClientUsecase.execute(input)
  }
}
