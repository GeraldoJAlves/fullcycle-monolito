import { Router } from "express";
import { FindInvoiceUsecase } from "../usecase/find-invoice";
import { InvoiceRepository } from "../repository";

export const invoiceRoute = Router();

invoiceRoute.get("/:id", async (req, res) => {
  try {
    const usecase = new FindInvoiceUsecase(new InvoiceRepository());

    const inovice = await usecase.execute({
      id: req.params.id
    });
    res.status(200).json(inovice);
  } catch (err) {
    if (err instanceof Error && err.message.startsWith("Invoice with id")) {
      return res.status(404).send();
    }
    console.error(err);
    res.status(500).send();
  }
});
