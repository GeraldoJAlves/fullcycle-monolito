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

export interface CheckStockFacadeInputDTO {
  id: string;
}

export interface CheckStockFacadeOutputDTO {
  id: string;
  stock: number;
}

export interface ProductAdmFacadeInterface {
  addProduct(
    input: AddProductFacadeInputDTO
  ): Promise<AddProductFacadeOutputDTO>;
  checkStock(
    input: CheckStockFacadeInputDTO
  ): Promise<CheckStockFacadeOutputDTO>;
}
