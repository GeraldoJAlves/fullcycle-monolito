import { Id } from "@/modules/@shared/domain/value-object";
import Product from "./product.entity"

describe("Product unit tests", () => {

  it("Should create a product without an id", () => {

    const product = new Product({
      name: "Ball",
      description: "simple ball",
      purchasePrice: 2.99,
      stock: 2,
    });

    expect(product.getId()).toBeInstanceOf(Id)
    expect(product.getName()).toBe("Ball")
    expect(product.getPurchasePrice()).toBe(2.99)
    expect(product.getDescription()).toBe("simple ball")
    expect(product.getStock()).toBe(2)
    expect(product.getCreatedAt()).toBeInstanceOf(Date)
    expect(product.getUpdatedAt()).toBeInstanceOf(Date)
  })
})