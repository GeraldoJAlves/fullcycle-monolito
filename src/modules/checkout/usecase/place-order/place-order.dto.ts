export interface PlaceOrderUsecaseInputDTO {
  clientId: string;
  products: {
    productId: string;
  }[];
}

export interface PlaceOrderUsecaseOutputDTO {
  id: string;
  invoiceId: string;
  status: string;
  total: number;
  products: {
    productId: string;
  }[];
}
