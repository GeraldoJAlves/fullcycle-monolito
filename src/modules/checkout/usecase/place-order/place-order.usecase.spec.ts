import { Address, Id } from "@/modules/@shared/domain/value-object";
import { ClientAdmFacadeFactory } from "@/modules/client-adm/factory";
import { ClientAdmFacadeInterface } from "@/modules/client-adm/facade";
import { StoreCatalogFacadeFactory } from "@/modules/store-catalog/factory";
import { StoreCatalogFacadeInterface } from "@/modules/store-catalog/facade";
import { ProductAdmFacadeFactory } from "@/modules/product-adm/factory";
import { ProductAdmFacadeInterface } from "@/modules/product-adm/facade";
import { InvoiceFacadeFactory } from "@/modules/invoice/factory";
import { InvoiceFacadeInterface } from "@/modules/invoice/facade";
import { PaymentFacadeFactory } from "@/modules/payment/factory";
import { PaymentFacadeInterface } from "@/modules/payment/facade";
import { OrderGateway } from "@/modules/checkout/gateway";
import { Client, Order, Product } from "@/modules/checkout/domain";
import PlaceOrderUsecase from "./place-order.usecase";

class OrderRepository implements OrderGateway {
  save(order: Order, invoiceId: Id): Promise<Order> {
    throw new Error("Method not implemented.");
  }
}

const makeSut = () => {
  const clientAdmFacade = ClientAdmFacadeFactory.create();
  const productAdmFacade = ProductAdmFacadeFactory.create();
  const storeCatalogFacade = StoreCatalogFacadeFactory.create();
  const invoiceFacade = InvoiceFacadeFactory.create();
  const paymentFacade = PaymentFacadeFactory.create();
  const orderRepository = new OrderRepository();

  const sut = new PlaceOrderUsecase(
    clientAdmFacade,
    productAdmFacade,
    storeCatalogFacade,
    invoiceFacade,
    paymentFacade,
    orderRepository
  );

  defaultMock(
    clientAdmFacade,
    productAdmFacade,
    storeCatalogFacade,
    invoiceFacade,
    paymentFacade,
    orderRepository
  );
  return {
    sut,
    clientAdmFacade,
    productAdmFacade,
    storeCatalogFacade,
    invoiceFacade,
    paymentFacade,
    orderRepository,
  };
};

const defaultMock = (
  clientAdmFacade: ClientAdmFacadeInterface,
  productAdmFacade: ProductAdmFacadeInterface,
  storeCatalogFacade: StoreCatalogFacadeInterface,
  invoiceFacade: InvoiceFacadeInterface,
  paymentFacade: PaymentFacadeInterface,
  orderRepository: OrderGateway
) => {
  jest.spyOn(clientAdmFacade, "find").mockResolvedValue({
    id: "c2",
    name: "john",
    email: "email@email 1",
    address: {
      street: "street 2",
      number: "30",
      complement: "none",
      city: "city M",
      state: "WC",
      zipCode: "999-99",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  jest.spyOn(productAdmFacade, "checkStock").mockResolvedValue({
    id: "p1",
    stock: 1,
  });

  jest.spyOn(storeCatalogFacade, "find").mockResolvedValue({
    id: "p1",
    name: "ball",
    description: "red",
    salesPrice: 6.99,
  });

  jest.spyOn(invoiceFacade, "generate").mockResolvedValue({
    id: "i1",
    name: "",
    document: "",
    street: "",
    number: "",
    complement: "",
    city: "",
    state: "",
    zipCode: "",
    items: [
      {
        id: "",
        name: "",
        price: 10,
      },
    ],
    total: 10,
  });

  jest.spyOn(paymentFacade, "process").mockResolvedValue({
    transactionId: "",
    orderId: "",
    amount: 110,
    status: "approved",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  jest.spyOn(orderRepository, "save").mockImplementation(undefined);
};

describe("PlaceOrder usecase", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("clientAdmFacade", () => {
    it("should call ClientAdmFacade", async () => {
      const { sut, clientAdmFacade } = makeSut();

      const clientAdmFacadeSpy = jest
        .spyOn(clientAdmFacade, "find")
        .mockClear()
        .mockResolvedValueOnce({
          id: "c2",
          name: "john",
          email: "email@email 1",
          address: {
            street: "street 2",
            number: "30",
            complement: "none",
            city: "city M",
            state: "WC",
            zipCode: "999-99",
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        });

      const input = {
        clientId: "c1",
        products: [{ productId: "1" }, { productId: "2" }],
      };

      await sut.execute(input);

      expect(clientAdmFacadeSpy).toHaveBeenCalled();
    });

    it("should throw when clientId was not found", async () => {
      const { sut, clientAdmFacade } = makeSut();

      jest
        .spyOn(clientAdmFacade, "find")
        .mockRejectedValue(new Error("Client not found"));

      const input = {
        clientId: "",
        products: [{ productId: "1" }, { productId: "2" }],
      };

      await expect(async () => {
        await sut.execute(input);
      }).rejects.toThrow(new Error("Client not found"));
    });
  });

  describe("productAdmFacade", () => {
    it("should call ProductAdmFacade", async () => {
      const { sut, productAdmFacade } = makeSut();

      const productAdmFacadeSpy = jest
        .spyOn(productAdmFacade, "checkStock")
        .mockClear()
        .mockResolvedValue({
          id: "p1",
          stock: 1,
        });

      const input = {
        clientId: "c1",
        products: [{ productId: "1" }, { productId: "2" }],
      };

      await sut.execute(input);

      expect(productAdmFacadeSpy).toHaveBeenCalledTimes(input.products.length);
    });

    it("should throw when an empty list of products is provided", async () => {
      const { sut, productAdmFacade } = makeSut();

      const productAdmFacadeSpy = jest
        .spyOn(productAdmFacade, "checkStock")
        .mockResolvedValueOnce({
          id: "p1",
          stock: 1,
        });

      const input = {
        clientId: "",
        products: [],
      };

      await expect(async () => {
        await sut.execute(input);
      }).rejects.toThrow(new Error("Must provide at least one product"));
      expect(productAdmFacadeSpy).toHaveBeenCalledTimes(0);
    });

    it("should throw when a product is out of stock", async () => {
      const { sut, productAdmFacade } = makeSut();

      const productAdmFacadeSpy = jest
        .spyOn(productAdmFacade, "checkStock")
        .mockResolvedValueOnce({
          id: "p1",
          stock: 0,
        });

      const input = {
        clientId: "",
        products: [{ productId: "p1" }],
      };

      await expect(async () => {
        await sut.execute(input);
      }).rejects.toThrow(new Error("Product p1 out of stock"));
      expect(productAdmFacadeSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("storeCatalogFacade", () => {
    it("should call StoreCatalogFacade", async () => {
      const { sut, storeCatalogFacade } = makeSut();

      const storeCatalogFacadeSpy = jest
        .spyOn(storeCatalogFacade, "find")
        .mockClear()
        .mockResolvedValueOnce({
          id: "p1",
          name: "ball",
          description: "red",
          salesPrice: 6.99,
        });

      const input = {
        clientId: "c1",
        products: [{ productId: "1" }, { productId: "2" }],
      };

      await sut.execute(input);

      expect(storeCatalogFacadeSpy).toHaveBeenCalledTimes(2);
    });

    it("should throw when product was not found", async () => {
      const { sut, storeCatalogFacade } = makeSut();

      jest
        .spyOn(storeCatalogFacade, "find")
        .mockClear()
        .mockRejectedValue(new Error("Product not found"));

      const input = {
        clientId: "",
        products: [{ productId: "1" }, { productId: "2" }],
      };

      await expect(async () => {
        await sut.execute(input);
      }).rejects.toThrow(new Error("Product not found"));
    });
  });

  describe("paymentFacade", () => {
    it("should call PaymentFacade", async () => {
      const { sut, paymentFacade } = makeSut();

      const paymentFacadeSpy = jest
        .spyOn(paymentFacade, "process")
        .mockClear()
        .mockResolvedValueOnce({
          transactionId: "",
          orderId: "",
          amount: 110,
          status: "approved",
          createdAt: new Date(),
          updatedAt: new Date(),
        });

      const input = {
        clientId: "c1",
        products: [{ productId: "1" }, { productId: "2" }],
      };

      await sut.execute(input);

      expect(paymentFacadeSpy).toHaveBeenCalled();
    });

    it("should throw when payment was not approved", async () => {
      const { sut, paymentFacade, invoiceFacade } = makeSut();

      jest
        .spyOn(paymentFacade, "process")
        .mockClear()
        .mockRejectedValue(new Error("Payment was not approved"));

      const invoiceFacadeSpy = jest.spyOn(invoiceFacade, "generate");

      const input = {
        clientId: "",
        products: [{ productId: "1" }, { productId: "2" }],
      };

      await expect(async () => {
        await sut.execute(input);
      }).rejects.toThrow(new Error("Payment was not approved"));
      expect(invoiceFacadeSpy).toHaveBeenCalledTimes(0);
    });
  });

  describe("invoiceFacade", () => {
    it("should call InvoiceFacade", async () => {
      const { sut, invoiceFacade, storeCatalogFacade } = makeSut();

      const invoiceFacadeSpy = jest
        .spyOn(invoiceFacade, "generate")
        .mockClear()
        .mockResolvedValueOnce({
          id: "i1",
          name: "john",
          document: "",
          street: "street 1",
          number: "90",
          complement: "comp",
          city: "city A",
          state: "UI",
          zipCode: "999",
          items: [
            {
              id: "p1",
              name: "ball",
              price: 10,
            },
          ],
          total: 10,
        });
      jest.spyOn(storeCatalogFacade, "find").mockClear().mockResolvedValue({
        id: "p1",
        name: "ball",
        description: "red",
        salesPrice: 10,
      });

      const input = {
        clientId: "c1",
        products: [{ productId: "p1" }],
      };

      const output = await sut.execute(input);

      expect(invoiceFacadeSpy).toHaveBeenCalled();
      expect(output.id).toBeDefined();
      expect(output.invoiceId).toBe("i1");
      expect(output.products).toEqual([{ productId: "p1" }]);
      expect(output.total).toEqual(10);
      expect(output.status).toEqual("approved");
    });

    it("should throw if invoice throws", async () => {
      const { sut, invoiceFacade } = makeSut();

      jest
        .spyOn(invoiceFacade, "generate")
        .mockClear()
        .mockRejectedValue(new Error("Invoice error"));

      const input = {
        clientId: "",
        products: [{ productId: "1" }, { productId: "2" }],
      };

      await expect(async () => {
        await sut.execute(input);
      }).rejects.toThrow(new Error("Invoice error"));
    });
  });

  describe("orderRepository", () => {
    it("should call OrderRepository", async () => {
      const { sut, orderRepository } = makeSut();

      const client = new Client({
        name: "John",
        email: "email@email.com",
        address: new Address("street 1", "1", "", "city A", "UC", "999999"),
      });

      const products = [
        new Product({ name: "p1", description: "blue", salesPrice: 7.66 }),
      ];

      const order = new Order({ client, products });

      const orderRepositorySpy = jest
        .spyOn(orderRepository, "save")
        .mockClear()
        .mockResolvedValueOnce(order);

      const input = {
        clientId: "c1",
        products: [{ productId: "p1" }],
      };

      await sut.execute(input);

      expect(orderRepositorySpy).toHaveBeenCalled();
    });

    it("should throw if OrderRepository throws", async () => {
      const { sut, orderRepository } = makeSut();

      jest
        .spyOn(orderRepository, "save")
        .mockClear()
        .mockRejectedValue(new Error("error to connect"));

      const input = {
        clientId: "c1",
        products: [{ productId: "p1" }],
      };

      expect(async () => {
        await sut.execute(input);
      }).rejects.toThrow("error to connect");
    });
  });
});
