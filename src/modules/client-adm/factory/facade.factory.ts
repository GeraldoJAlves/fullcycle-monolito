import { ClientAdmFacade } from "@/modules/client-adm/facade";
import { ClientRepository } from "@/modules/client-adm/repository";
import { AddClientUsecase } from "@/modules/client-adm/usecase/add-client";
import { FindClientUsecase } from "@/modules/client-adm/usecase/find-client";

export default class ClientAdmFacadeFactory {
  static create () {
    const repository = new ClientRepository()
    const addClientUsecase = new AddClientUsecase(repository)
    const findClientUsecase = new FindClientUsecase(repository)
    return new ClientAdmFacade(addClientUsecase, findClientUsecase)
  }
}