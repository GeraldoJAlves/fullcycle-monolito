import { Sequelize } from "sequelize-typescript";
import { InvoiceItemModel, InvoiceModel } from "@/modules/invoice/repository";
import InvoiceFacadeFactory from "./facade.factory";
import InvoiceFactory from "./entity.factory";

describe("InvoiceFacade factory", () => {
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

  it("should generate an invoice", async () => {
    const sut = InvoiceFacadeFactory.create();

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

    const response = await sut.generate(input);

    const invoiceDb = await InvoiceModel.findOne({
      where: { id: response.id },
    });
    const itemsDb = await invoiceDb?.getItems();

    expect(itemsDb?.length).toEqual(2);
    expect(invoiceDb?.name).toEqual(input.name);
  });

  it("should find an invoice", async () => {
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

    const sut = InvoiceFacadeFactory.create();
    const response = await sut.find({ id: invoice.getId().getValue() });

    expect(response.name).toEqual(invoice.getName());
    expect(response.items.length).toEqual(invoice.getItems().length);
    expect(response.total).toEqual(invoice.getTotal());
  });
});
