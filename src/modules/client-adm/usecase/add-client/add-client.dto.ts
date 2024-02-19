export interface AddClientUsecaseInputDTO {
  name: string;
  email: string;
  address: {
    street: string,
    number: string,
    complement: string,
    city: string,
    state: string,
    zipCode: string
  };
}

export interface AddClientUsecaseOutputDTO {
  id: string;
  name: string;
  email: string;
  address: {
    street: string,
    number: string,
    complement: string,
    city: string,
    state: string,
    zipCode: string
  };
  createdAt: Date;
  updatedAt: Date;
}
