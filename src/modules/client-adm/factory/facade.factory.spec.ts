import { Sequelize } from "sequelize-typescript";
import { ClientModel, ClientRepository } from "../repository";
import { Client } from "../domain";
import ClientAdmFacadeFactory from "./facade.factory";

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
      address: "street 0, city C",
    };

    const sut = ClientAdmFacadeFactory.create();

    const output = await sut.add(client);

    const clientDb = await ClientModel.findOne({
      where: { id: output.id },
    });

    expect(clientDb?.id).toBeDefined();
    expect(output.id).toBe(clientDb?.id);
  });

  it("should find a client", async () => {
    const clientProps = {
      id: "1",
      name: "Alexander",
      email: "aa@email.com",
      address: "street 0, city C",
      createdAt: new Date(),
      updatedAt: new Date("2020-09-01 04:00:00"),
    };
    await ClientModel.create(clientProps);

    const sut = ClientAdmFacadeFactory.create();

    const client = await sut.find({id: "1"});

    expect(client.id).toBe(clientProps.id);
    expect(client.name).toBe(clientProps.name);
    expect(client.email).toBe(clientProps.email);
    expect(client.address).toBe(clientProps.address);
    expect(client.createdAt).toEqual(clientProps.createdAt);
    expect(client.updatedAt).toEqual(clientProps.updatedAt);
  });
});
