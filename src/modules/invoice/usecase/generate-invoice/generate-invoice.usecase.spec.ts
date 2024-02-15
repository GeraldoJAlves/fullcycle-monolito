import { Id } from "@/modules/@shared/domain/value-object";
import { Invoice } from "@/modules/invoice/domain";
import { InvoiceGatewayInterface } from "@/modules/invoice/gateway";
import { InvoiceFactory } from "@/modules/invoice/factory";
import GenerateInvoiceUsecase from "./generate-invoice.usecase";

class InvoiceRepository implements InvoiceGatewayInterface {
  find(invoiceId: Id): Promise<Invoice> {
    throw new Error("Method not implemented.");
  }
  save(invoice: Invoice): Promise<Invoice> {
    throw new Error("Method not implemented.");
  }
}

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
      id: "1",
      name: "ball",
      price: 10,
    },
    {
      id: "2",
      name: "table",
      price: 30,
    },
  ],
};

describe("GenerateInvoice usecase", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should call InvoiceRepository", async () => {
    const repository = new InvoiceRepository();
    const usecase = new GenerateInvoiceUsecase(repository);

    const invoice = InvoiceFactory.create(input)

    const repositorySpy = jest
      .spyOn(repository, "save")
      .mockResolvedValueOnce(invoice);
    jest.spyOn(InvoiceFactory, 'create').mockReturnValueOnce(invoice)

    const response = await usecase.execute(input);

    expect(repositorySpy).toHaveBeenCalled();
    expect(response.id).toBeDefined();

    expect(response).toEqual({
      id: invoice.getId().getValue(),
      name: invoice.getName(),
      document: invoice.getDocument(),
      street: invoice.getAddress().getStreet(),
      number: invoice.getAddress().getNumber(),
      complement: invoice.getAddress().getComplement(),
      city: invoice.getAddress().getCity(),
      state: invoice.getAddress().getState(),
      zipCode: invoice.getAddress().getZipCode(),
      items: invoice.getItems().map((item) => ({
        id: item.getId().getValue(),
        name: item.getName(),
        price: item.getPrice(),
      })),
      total: invoice.getTotal(),
    });
  });

  it("should throw if InvoiceRepository throws", async () => {
    const repository = new InvoiceRepository();
    const usecase = new GenerateInvoiceUsecase(repository);

    jest
      .spyOn(repository, "save")
      .mockRejectedValue(new Error("error to connect"));

    await expect(async () => {
      await usecase.execute(input);
    }).rejects.toThrow("error to connect");
  });
});
