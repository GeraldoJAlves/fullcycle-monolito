import { Id } from "@/modules/@shared/domain/value-object";
import InvoiceItem from "./invoice-items.enitty";

describe("InvoiceItem entity", () => {
  it("should create an InvoiceItem", () => {
    const invoiceItems = new InvoiceItem({
      name: "table",
      price: 10,
    });

    expect(invoiceItems.getName()).toBe("table");
    expect(invoiceItems.getPrice()).toBe(10);
  });

  it("should create an InvoiceItem with an existing id", () => {
    const invoiceItems = new InvoiceItem({
      id: new Id("2"),
      name: "table 2",
      price: 100,
    });

    expect(invoiceItems.getId()).toBeInstanceOf(Id);
    expect(invoiceItems.getId().getValue()).toBeTruthy();
    expect(invoiceItems.getName()).toBe("table 2");
    expect(invoiceItems.getPrice()).toBe(100);
  });

  it("should throw if price is less than or equal to 0", () => {
    expect(() => {
      new InvoiceItem({
        id: new Id("2"),
        name: "table 2",
        price: 0,
      });
    }).toThrow("Item table 2 must be greater than 0");
  });
});
