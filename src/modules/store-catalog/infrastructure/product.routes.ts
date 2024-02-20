import { Router } from "express";
import { ProductRepository } from "@/modules/store-catalog/repository";
import { FindProductUsecase } from "@/modules/store-catalog/usecase/find-product";

export const productRoute = Router();

productRoute.get("/:id", async (req, res) => {
  try {
    const usecase = new FindProductUsecase(new ProductRepository());
    const product = await usecase.execute({
      id: req.params.id,
    });
    res.json(product);
  } catch (err) {
    if (err instanceof Error && err.message.startsWith("Product with id")) {
      return res.status(404).send();
    }
    console.error(err);
    res.status(500).send();
  }
});
