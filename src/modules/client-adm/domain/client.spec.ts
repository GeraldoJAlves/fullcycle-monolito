import { Address, Id } from "@/modules/@shared/domain/value-object";
import Client from "./client.entity";

describe("Client entity", () => {
  it("should create a new id", () => {
    const address = new Address(
      "street 1",
      "1",
      "",
      "city A",
      "UC",
      "999999"
    )
    const client = new Client({
      name: "Paul",
      email: "email@email.com",
      address,
    });

    expect(client.getId()).toBeInstanceOf(Id)
    expect(client.getName()).toBe("Paul")
    expect(client.getEmail()).toBe("email@email.com")
    expect(client.getAddress()).toEqual(address)
  });
});
