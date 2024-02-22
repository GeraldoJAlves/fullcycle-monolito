import request from "supertest";
import { app, sequelize } from "@/modules/@shared/infrastructure/express";

describe("Invoice route", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe("GET /:id", () => {
    it("should return an invoice", async () => {
      const clientResponse = await request(app).post("/client").send({
        name: "john",
        email: "john@email.com",
        street: "street 1",
        number: "90",
        complement: "compl",
        city: "city A",
        state: "OH",
        zipCode: "9078",
      });

      expect(clientResponse.status).toBe(201);

      const productResponse = await request(app).post("/product").send({
        name: "ball",
        description: "red",
        purchasePrice: 112.99,
        stock: 10,
      });

      const checkoutResponse = await request(app)
        .post("/checkout")
        .send({
          clientId: clientResponse.body.id,
          products: [{ productId: productResponse.body.id }],
        });

      const response = await request(app)
        .get(`/invoice/${checkoutResponse.body.invoiceId}`)
        .send();

      expect(response.status).toBe(200);
    });

    it("should return 404 if the invoice does not exist", async () => {
      const response = await request(app).get(`/invoice/898908908098`).send();

      expect(response.status).toBe(404);
    });
  });
});
