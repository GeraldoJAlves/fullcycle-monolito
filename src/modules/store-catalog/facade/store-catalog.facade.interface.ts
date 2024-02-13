export interface FindStoreCatalogFacadeInputDTO {
  id: string;
}

export interface FindStoreCatalogFacadeOutputDTO {
  id: string;
  name: string;
  description: string;
  salesPrice: number;
}

export interface FindAllStoreCatalogFacadeInputDTO {}

export interface FindAllStoreCatalogFacadeOutputDTO {
  products: {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
  }[];
}

export interface StoreCatalogFacadeInterface {
  find(
    input: FindStoreCatalogFacadeInputDTO
  ): Promise<FindStoreCatalogFacadeOutputDTO>;

  findAll(
    input: FindAllStoreCatalogFacadeInputDTO
  ): Promise<FindAllStoreCatalogFacadeOutputDTO>;
}
