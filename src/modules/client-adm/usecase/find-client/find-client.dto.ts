export interface FindClientUsecaseInputDTO {
  id: string;
}

export interface FindClientUsecaseOutputDTO {
  id: string;
  name: string;
  email: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}
