import { Id } from "@/modules/@shared/domain/value-object";
import Client from "./client.entity";

describe("Client entity", () => {
  it("should create a new id", () => {
    const client = new Client({
      name: "Paul",
      email: "email@email.com",
      address: "street 1, city A",
    });

    expect(client.getId()).toBeInstanceOf(Id)
    expect(client.getName()).toBe("Paul")
    expect(client.getEmail()).toBe("email@email.com")
    expect(client.getAddress()).toBe("street 1, city A")
  });
});
