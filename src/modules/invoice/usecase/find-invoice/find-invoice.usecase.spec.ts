import { Id } from "@/modules/@shared/domain/value-object";
import { InvoiceGatewayInterface } from "@/modules/invoice/gateway";
import { Invoice } from "@/modules/invoice/domain";
import FindInvoiceUsecase from "./find-invoice.usecase";
import InvoiceItem from "../../domain/invoice-items.enitty";
import { Address } from "../../value-object";

class InvoiceRepository implements InvoiceGatewayInterface {
  find(invoiceId: Id): Promise<Invoice> {
    throw new Error("Method not implemented.");
  }
  save(invoice: Invoice): Promise<Invoice> {
    throw new Error("Method not implemented.");
  }
}

describe("FindInvoice usecase", () => {
  it("should call InvoiceRepository", async () => {
    const repository = new InvoiceRepository();
    const usecase = new FindInvoiceUsecase(repository);

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

    const repositorySpy = jest
      .spyOn(repository, "find")
      .mockResolvedValueOnce(invoice);

    const input = { id: invoice.getId().getValue() };
    const response = await usecase.execute(input);

    expect(repositorySpy).toHaveBeenCalledWith(input);
    expect(response).toEqual({
      id: invoice.getId().getValue(),
      name: invoice.getName(),
      document: invoice.getDocument(),
      address: {
        street: invoice.getAddress().getStreet(),
        number: invoice.getAddress().getNumber(),
        complement: invoice.getAddress().getComplement(),
        city: invoice.getAddress().getCity(),
        state: invoice.getAddress().getState(),
        zipCode: invoice.getAddress().getZipCode(),
      },
      items: invoice.getItems().map((item) => ({
        id: item.getId().getValue(),
        name: item.getName(),
        price: item.getPrice(),
      })),
      total: invoice.getTotal(),
      createdAt: invoice.getCreatedAt(),
    });
  });

  it("should throw if InvoiceRepository throws", async () => {
    const repository = new InvoiceRepository();
    const usecase = new FindInvoiceUsecase(repository);

    jest
      .spyOn(repository, "find")
      .mockRejectedValue(new Error("error to connect"));

    await expect(async () => {
      await usecase.execute({ id: "1" });
    }).rejects.toThrow("error to connect");
  });
});
