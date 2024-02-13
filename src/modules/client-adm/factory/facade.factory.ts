import { ClientAdmFacade } from "../facade";
import { ClientRepository } from "../repository";
import { AddClientUsecase } from "../usecase/add-client";
import { FindClientUsecase } from "../usecase/find-client";

export default class ClientAdmFacadeFactory {
  static create () {
    const repository = new ClientRepository()
    const addClientUsecase = new AddClientUsecase(repository)
    const findClientUsecase = new FindClientUsecase(repository)
    return new ClientAdmFacade(addClientUsecase, findClientUsecase)
  }
}