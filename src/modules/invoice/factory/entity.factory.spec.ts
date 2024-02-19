import { Id, Address} from "@/modules/@shared/domain/value-object";
import InvoiceFactory from "./entity.factory";

describe("Invoice factory", () => {
  it("should create an invoice", () => {
    const input = {
      name: "July",
      document: "doc 1",
      street: "street 1",
      number: "40",
      complement: "house",
      city: "city B",
      state: "AM",
      zipCode: "9999-99",
      items: [
        {
          name: "ball",
          price: 10,
        },
        {
          name: "table",
          price: 30,
        },
      ],
    };

    const invoice = InvoiceFactory.create(input);

    expect(invoice.getId()).toBeInstanceOf(Id);
    expect(invoice.getName()).toBe(input.name)
    expect(invoice.getDocument()).toBe(input.document)
    expect(invoice.getAddress()).toBeInstanceOf(Address)
    expect(invoice.getAddress().getStreet()).toBe(input.street)
    expect(invoice.getAddress().getNumber()).toBe(input.number)
    expect(invoice.getAddress().getComplement()).toBe(input.complement)
    expect(invoice.getAddress().getCity()).toBe(input.city)
    expect(invoice.getAddress().getState()).toBe(input.state)
    expect(invoice.getAddress().getZipCode()).toBe(input.zipCode)
    expect(invoice.getItems().length).toBe(input.items.length)
    expect(invoice.getItems()[0].getName()).toBe(input.items[0].name)
    expect(invoice.getItems()[1].getName()).toBe(input.items[1].name)
    expect(invoice.getTotal()).toBe(40)
  });
});
