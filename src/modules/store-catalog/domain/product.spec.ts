import { Id } from "@/modules/@shared/domain/value-object";
import { Product } from ".";

describe("Product test", () => {
  it("should create a product", () => {
    const input = {
      id: new Id("id-1"),
      name: "product 1",
      description: "description test",
      salesPrice: 8.88,
    };

    const product = new Product(input);

    expect(product.getId()).toEqual(input.id);
    expect(product.getName()).toEqual(input.name);
    expect(product.getDescription()).toEqual(input.description);
    expect(product.getSalesPrice()).toEqual(input.salesPrice);
  });
});
