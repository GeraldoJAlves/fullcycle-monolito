import Transaction, { StatusTypes } from "./transaction.entity";

describe("Transaction entity", () => {
  it("should create a pending transaction", () => {
    const transaction = new Transaction({
      amount: 20,
      orderId: "2",
    });

    expect(transaction.getId()).toBeDefined();
    expect(transaction.getAmount()).toBe(20);
    expect(transaction.getOrderId()).toBe("2");
    expect(transaction.getStatus()).toBe(StatusTypes.PENDING);
    expect(transaction.getCreatedAt()).toBeDefined();
    expect(transaction.getUpdatedAt()).toBeDefined();
  });

  it("should create a declined transaction", () => {
    const transaction = new Transaction({
      amount: 20,
      orderId: "2",
      status: StatusTypes.DECLINED,
    });

    expect(transaction.getStatus()).toBe(StatusTypes.DECLINED);
  });

  it("should change status to approved", () => {
    const transaction = new Transaction({
      amount: 120,
      orderId: "2",
    });

    transaction.proccess();

    expect(transaction.getStatus()).toBe(StatusTypes.APPROVED);
  });

  it("should change status to declined", () => {
    const transaction = new Transaction({
      amount: 99,
      orderId: "2",
    });

    transaction.proccess();

    expect(transaction.getStatus()).toBe(StatusTypes.DECLINED);
  });

  it("should throw if amount is less or equal 0", () => {
    expect(() => {
      new Transaction({
        amount: 0,
        orderId: "2",
      });
    }).toThrow("Amount must be greater than 0");
  });
});
