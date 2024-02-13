export interface AddClientUsecaseInputDTO {
  name: string;
  email: string;
  address: string;
}

export interface AddClientUsecaseOutputDTO {
  id: string;
  name: string;
  email: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}
