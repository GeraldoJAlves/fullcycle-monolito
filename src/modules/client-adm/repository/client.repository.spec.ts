import { Sequelize } from "sequelize-typescript";
import { Address, Id } from "@/modules/@shared/domain/value-object";
import { Client } from "@/modules/client-adm/domain";
import ClientModel from "./client.model";
import ClientRepository from "./client.repository";

describe("Client repository", () => {
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

  describe("add()", () => {
    it("should create a client", async () => {
      const address = new Address(
        "street 1",
        "30",
        "none",
        "city M",
        "WC",
        "999-99"
      );

      const client = new Client({
        name: "Alexander",
        email: "aa@email.com",
        address,
      });

      const repository = new ClientRepository();

      await repository.add(client);

      const clientDb = await ClientModel.findOne({
        where: { id: client.getId().getValue() },
      });

      expect(clientDb?.id).toBe(client.getId().getValue());
    });
  });

  describe("find()", () => {
    it("should find a client", async () => {
      const clientProps = {
        id: "1",
        name: "Alexander",
        email: "aa@email.com",
        street: "street 2",
        number: "30",
        complement: "none",
        city: "city M",
        state: "WC",
        zipCode: "999-99",
        createdAt: new Date(),
        updatedAt: new Date("2020-09-01 04:00:00"),
      };
      await ClientModel.create(clientProps);

      const repository = new ClientRepository();

      const client = await repository.find(new Id("1"));

      expect(client.getId().getValue()).toBe(clientProps.id);
      expect(client.getName()).toBe(clientProps.name);
      expect(client.getEmail()).toBe(clientProps.email);
      expect(client.getAddress().getStreet()).toBe(clientProps.street);
      expect(client.getAddress().getNumber()).toBe(clientProps.number);
      expect(client.getAddress().getComplement()).toBe(clientProps.complement);
      expect(client.getAddress().getCity()).toBe(clientProps.city);
      expect(client.getAddress().getState()).toBe(clientProps.state);
      expect(client.getAddress().getZipCode()).toBe(clientProps.zipCode);
      expect(client.getCreatedAt()).toEqual(clientProps.createdAt);
      expect(client.getUpdatedAt()).toEqual(clientProps.updatedAt);
    });

    it("should throw if client does not exist", async () => {
      const repository = new ClientRepository();

      await expect(async () => {
        await repository.find(new Id("1"));
      }).rejects.toThrow(new Error("Client with id 1 not found"));
    });
  });
});
