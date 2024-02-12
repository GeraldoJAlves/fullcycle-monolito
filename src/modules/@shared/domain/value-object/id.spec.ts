import Id from "./id.value-object";

describe("Id value object", () => {
  it("should be return the same id", () => {
    const id = new Id("123");

    expect(id.getValue()).toBe("123");
  });

  it("should be return a random uuid", () => {
    const id = new Id();

    expect(id.getValue()).toBeDefined();
  });
});
