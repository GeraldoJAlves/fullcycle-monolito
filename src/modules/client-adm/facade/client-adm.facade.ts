import ClientAdmFacadeInterface, {
  AddClientFacadeInputDTO,
  AddClientFacadeOutputDTO,
  FindClientFacadeInputDTO,
  FindClientFacadeOutputDTO,
} from "./client-adm.facade.interface";
import { AddClientUsecase } from "../usecase/add-client";
import { FindClientUsecase } from "../usecase/find-client";

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
