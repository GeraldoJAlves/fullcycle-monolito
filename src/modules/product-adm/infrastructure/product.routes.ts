import { Router } from "express";
import { z } from "zod";

import { ProductRepository } from "@/modules/product-adm/repository";
import { AddProductUsecase } from "@/modules/product-adm/usecase/add-product";
import { CheckStockUsecase } from "@/modules/product-adm/usecase/check-stock";
import { validate } from "@/modules/@shared/infrastructure";

export const productRoute = Router();

const CreateProductSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "invalid name",
    }),
    description: z.string({ required_error: "invalid description" }),
    purchasePrice: z.number().gt(0),
    stock: z.number().gt(0),
  }),
});

productRoute.get("/:id/check-stock", async (req, res) => {
  try {
    const usecase = new CheckStockUsecase(new ProductRepository());
    const stock = await usecase.execute({
      id: req.params.id,
    });
    res.json(stock);
  } catch (err) {
    if (err instanceof Error && err.message.startsWith("Product with id")) {
      return res.status(404).send();
    }
    console.error(err);
    res.status(500).send();
  }
});

productRoute.post("/", validate(CreateProductSchema), async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send();
    }

    const { name, description, purchasePrice, stock } = req.body;

    if (!name || !description || purchasePrice <= 0 || stock <= 0) {
      return res.status(400).send();
    }

    const usecase = new AddProductUsecase(new ProductRepository());

    const productDTO = {
      name: req.body.name,
      description: req.body.description,
      purchasePrice: req.body.purchasePrice,
      stock: req.body.stock,
    };
    const product = await usecase.execute(productDTO);
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});
