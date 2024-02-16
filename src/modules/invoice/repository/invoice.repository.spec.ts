import { Sequelize } from "sequelize-typescript";
import { InvoiceFactory } from "@/modules/invoice/factory";
import InvoiceItemModel from "./invoice-item.model";
import InvoiceModel from "./invoice.model";
import InvoiceRepository from "./invoice.repository";
import { Id } from "@/modules/@shared/domain/value-object";

describe("Invoice repository", () => {
  let sequelize: Sequelize;
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      database: ":memory:",
      logging: false,
      sync: {
        force: true,
      },
    });
    await sequelize.addModels([InvoiceItemModel, InvoiceModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  describe("find()", () => {
    it("should find an existing invoice", async () => {
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
            price: 35,
          },
          {
            name: "table",
            price: 30,
          },
        ],
      };

      const invoice = InvoiceFactory.create(input);

      await InvoiceModel.create({
        id: invoice.getId().getValue(),
        name: invoice.getName(),
        document: invoice.getDocument(),
        street: invoice.getAddress().getStreet(),
        number: invoice.getAddress().getNumber(),
        complement: invoice.getAddress().getComplement(),
        city: invoice.getAddress().getCity(),
        state: invoice.getAddress().getState(),
        zipCode: invoice.getAddress().getZipCode(),
        createdAt: invoice.getCreatedAt(),
      });

      for (const item of invoice.getItems()) {
        await InvoiceItemModel.create({
          id: item.getId().getValue(),
          invoiceId: invoice.getId().getValue(),
          name: item.getName(),
          price: item.getPrice(),
        });
      }

      const repository = new InvoiceRepository();
      const invoiceOutput = await repository.find(invoice.getId());

      expect(invoiceOutput).toBeDefined();
      expect(invoiceOutput.getTotal()).toBe(65);
    });

    it("should throw if invoice does not exist", async () => {
      const repository = new InvoiceRepository();

      await expect(async () => {
        await repository.find(new Id("23"));
      }).rejects.toThrow("Invoice with id 23 not found");
    });
  });

  describe("save()", () => {
    it("should save an invoice", async () => {
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
            price: 35,
          },
          {
            name: "table",
            price: 30,
          },
        ],
      };

      const invoice = InvoiceFactory.create(input);

      const repository = new InvoiceRepository();

      const invoiceOutput = await repository.save(invoice);

      const invoiceDb = await InvoiceModel.findOne({
        where: { id: invoice.getId().getValue() },
      });
      const itemsDb = await invoiceDb?.getItems();

      expect(invoiceOutput).toEqual(invoice);
      expect(itemsDb?.length).toEqual(input.items.length);
    });
  });
});
