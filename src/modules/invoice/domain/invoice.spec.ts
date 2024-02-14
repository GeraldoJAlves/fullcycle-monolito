import { Id } from "@/modules/@shared/domain/value-object";
import { Address } from "@/modules/invoice/value-object";
import InvoiceItem from "./invoice-items.enitty";
import Invoice from "./invoice.entity";

describe("Invoice entity", () => {
  it("should create an Invoice", () => {
    const address = new Address(
      "street 2",
      "30",
      "none",
      "city M",
      "WC",
      "999-99"
    );

    const items = [
      new InvoiceItem({ name: "item 1", price: 10 }),
      new InvoiceItem({ name: "item 2", price: 20 }),
      new InvoiceItem({ name: "item 3", price: 30 }),
    ];

    const invoice = new Invoice({
      name: "December",
      document: "x123",
      address,
      items,
    });

    expect(invoice.getId()).toBeInstanceOf(Id);
    expect(invoice.getName()).toBe("December");
    expect(invoice.getDocument()).toBe("x123");
    expect(invoice.getAddress()).toEqual(address);
    expect(invoice.getItems()).toEqual(items);
    expect(invoice.getTotalItems()).toEqual(60);
    expect(invoice.getCreatedAt()).toBeDefined();
    expect(invoice.getUpdatedAt()).toBeDefined();
  });

  it("should throw if an empty list of InvoiceItem is provided", () => {
    const address = new Address(
      "street 2",
      "30",
      "none",
      "city M",
      "WC",
      "999-99"
    );

    const items: InvoiceItem[] = [];

    expect(() => {
      new Invoice({
        name: "December",
        document: "x123",
        address,
        items,
      });
    }).toThrow("Invoice items must have at least one item");
  });
});
