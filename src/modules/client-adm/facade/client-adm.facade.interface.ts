export interface FindClientAdmFacadeInputDTO {
  id: string;
}

export interface FindClientAdmFacadeOutputDTO {
  id: string;
  name: string;
  email: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AddClientAdmFacadeInputDTO {
  name: string;
  email: string;
  address: string;
}

export interface AddClientAdmFacadeOutputDTO {
  id: string;
  name: string;
  email: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

export default interface ClientAdmFacadeInterface {
  add(input: AddClientAdmFacadeInputDTO): Promise<AddClientAdmFacadeOutputDTO>;
  find(
    input: FindClientAdmFacadeInputDTO
  ): Promise<FindClientAdmFacadeOutputDTO>;
}
