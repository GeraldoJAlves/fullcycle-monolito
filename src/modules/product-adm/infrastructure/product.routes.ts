import { Router } from "express";
import { ProductRepository } from "@/modules/product-adm/repository";
import { AddProductUsecase } from "@/modules/product-adm/usecase/add-product";
import { CheckStockUsecase } from "@/modules/product-adm/usecase/check-stock";

export const productRoute = Router();

productRoute.get("/:id/check-stock", async (req, res) => {
  try {
    const usecase = new CheckStockUsecase(new ProductRepository());
    const products = await usecase.execute({
      id: req.params.id,
    });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

productRoute.post("/", async (req, res) => {
  try {
    const usecase = new AddProductUsecase(new ProductRepository());
    const productDTO = {
      name: req.body.name,
      description: req.body.description,
      purchasePrice: req.body.purchasePrice,
      stock: req.body.stock
    };
    const product = await usecase.execute(productDTO);
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});