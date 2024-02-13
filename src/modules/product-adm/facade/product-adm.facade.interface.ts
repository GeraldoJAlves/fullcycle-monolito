export interface AddProductFacadeInputDTO {
  name: string;
  description: string;
  purchasePrice: number;
  stock: number;
}

export interface AddProductFacadeOutputDTO {
  id: string;
  name: string;
  description: string;
  purchasePrice: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductAdmFacadeInterface {
  addProduct(input: AddProductFacadeInputDTO): Promise<AddProductFacadeOutputDTO>;
}
