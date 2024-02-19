import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "@/modules/client-adm/repository";
import ClientAdmFacadeFactory from "./facade.factory";

const defaultInputAddress = {
  street: "street 2",
  number: "30",
  complement: "none",
  city: "city M",
  state: "WC",
  zipCode: "999-99"
}

describe("ClientAdmFacade factory", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    await sequelize.addModels([ClientModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a client", async () => {
    const client = {
      name: "Alexander",
      email: "aa@email.com",
      address: defaultInputAddress,
    };

    const sut = ClientAdmFacadeFactory.create();

    const output = await sut.add(client);

    const clientDb = await ClientModel.findOne({
      where: { id: output.id },
    });

    expect(clientDb?.id).toBeDefined();
    expect(output.id).toBe(clientDb?.id);
    expect(output.address.street).toEqual(clientDb?.street)
    expect(output.address.number).toEqual(clientDb?.number)
    expect(output.address.complement).toEqual(clientDb?.complement)
    expect(output.address.city).toEqual(clientDb?.city)
    expect(output.address.state).toEqual(clientDb?.state)
    expect(output.address.zipCode).toEqual(clientDb?.zipCode)
  });

  it("should find a client", async () => {
    const clientProps = {
      ...defaultInputAddress,
      id: "1",
      name: "Alexander",
      email: "aa@email.com",
      createdAt: new Date(),
      updatedAt: new Date("2020-09-01 04:00:00"),
    };
    await ClientModel.create(clientProps);

    const sut = ClientAdmFacadeFactory.create();

    const client = await sut.find({id: "1"});

    expect(client.id).toBe(clientProps.id);
    expect(client.name).toBe(clientProps.name);
    expect(client.email).toBe(clientProps.email);
    expect(client.address).toEqual(defaultInputAddress);
    expect(client.createdAt).toEqual(clientProps.createdAt);
    expect(client.updatedAt).toEqual(clientProps.updatedAt);
  });
});
