import { InvoiceRepository } from "@/modules/invoice/repository";
import { FindInvoiceUsecase } from "@/modules/invoice/usecase/find-invoice";
import { GenerateInvoiceUsecase } from "@/modules/invoice/usecase/generate-invoice";
import InvoiceFacade from "./invoice.facade";

const makeSut = () => {
  const repository = new InvoiceRepository();
  const findInvoiceUsecase = new FindInvoiceUsecase(repository);
  const generateInvoiceUsecase = new GenerateInvoiceUsecase(repository);

  const sut = new InvoiceFacade(findInvoiceUsecase, generateInvoiceUsecase);

  return {
    sut,
    findInvoiceUsecase,
    generateInvoiceUsecase,
  };
};

describe("Invoice facade", () => {
  describe("find()", () => {
    it("should call FindInvoiceUsecase", async () => {
      const { sut, findInvoiceUsecase } = makeSut();

      const invoice = {
        id: "1",
        name: "December",
        document: "x123",
        address: {
          street: "street 2",
          number: "40",
          complement: "house",
          city: "city B",
          state: "AM",
          zipCode: "9999-99",
        },
        items: [
          {
            id: "1",
            name: "item 1",
            price: 10,
          },
          {
            id: "2",
            name: "item 2",
            price: 20,
          },
          {
            id: "3",
            name: "item 3",
            price: 30,
          },
        ],
        total: 60,
        createdAt: new Date(),
      };

      const findInvoiceUsecasesSpy = jest
        .spyOn(findInvoiceUsecase, "execute")
        .mockResolvedValueOnce(invoice);

      const input = { id: "1" };
      const response = await sut.find(input);

      expect(findInvoiceUsecasesSpy).toHaveBeenCalledWith(input);
      expect(response).toEqual(invoice);
    });
  });

  describe("generate()", () => {
    it("should call GenerateInvoiceUsecase", async () => {
      const { sut, generateInvoiceUsecase } = makeSut();

      const input = {
        id: "1",
        name: "December",
        document: "x123",
        street: "street 2",
        number: "40",
        complement: "house",
        city: "city B",
        state: "AM",
        zipCode: "9999-99",
        items: [
          {
            id: "1",
            name: "item 1",
            price: 10,
          },
          {
            id: "2",
            name: "item 2",
            price: 20,
          },
          {
            id: "3",
            name: "item 3",
            price: 30,
          },
        ],
      };

      const mockReponseUsecase = { ...input, id: "1", total: 60 };
      const generateInvoiceUsecasesSpy = jest
        .spyOn(generateInvoiceUsecase, "execute")
        .mockResolvedValueOnce(mockReponseUsecase);

      const response = await sut.generate(input);

      expect(generateInvoiceUsecasesSpy).toHaveBeenCalledWith(input);
      expect(response).toEqual(mockReponseUsecase);
    });
  });
});
