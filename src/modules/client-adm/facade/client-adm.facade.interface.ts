export interface FindClientFacadeInputDTO {
  id: string;
}

export interface FindClientFacadeOutputDTO {
  id: string;
  name: string;
  email: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AddClientFacadeInputDTO {
  name: string;
  email: string;
  address: string;
}

export interface AddClientFacadeOutputDTO {
  id: string;
  name: string;
  email: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

export default interface ClientAdmFacadeInterface {
  add(input: AddClientFacadeInputDTO): Promise<AddClientFacadeOutputDTO>;
  find(
    input: FindClientFacadeInputDTO
  ): Promise<FindClientFacadeOutputDTO>;
}
