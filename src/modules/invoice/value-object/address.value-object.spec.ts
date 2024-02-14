import Address from "./address.value-object";

describe("Address value object", () => {
  it("should create an address", () => {
    const address = new Address(
      "street 1",
      "30",
      "none",
      "city M",
      "WC",
      "999-99"
    );

    expect(address.getStreet()).toBe("street 1");
    expect(address.getNumber()).toBe("30");
    expect(address.getComplement()).toBe("none");
    expect(address.getCity()).toBe("city M");
    expect(address.getState()).toBe("WC");
    expect(address.getZipCode()).toBe("999-99");
  });
});
