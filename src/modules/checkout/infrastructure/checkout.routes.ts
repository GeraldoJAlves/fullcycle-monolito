import { Router } from "express";
import { PlaceOrderUsecaseFactory } from "@/modules/checkout/factory";

export const checkoutRoute = Router();

checkoutRoute.post("/", async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send();
    }

    const { clientId, products } = req.body;

    if (!clientId || !products || products.length === 0) {
      return res.status(400).send();
    }

    const usecase = PlaceOrderUsecaseFactory.create();

    const orderDTO = {
      clientId,
      products
    };
    const product = await usecase.execute(orderDTO);
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});
