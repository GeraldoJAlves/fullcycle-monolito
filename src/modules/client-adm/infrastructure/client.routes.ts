import { Router } from "express";
import { ClientRepository } from "@/modules/client-adm/repository";
import { AddClientUsecase } from "@/modules/client-adm/usecase/add-client";

export const clientRoute = Router();

clientRoute.post("/", async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send();
    }

    const { name, email, street, number, complement, city, state, zipCode } =
      req.body;

    if (
      !name ||
      !email ||
      !street ||
      !number ||
      !complement ||
      !city ||
      !state ||
      !zipCode
    ) {
      return res.status(400).send();
    }

    const usecase = new AddClientUsecase(new ClientRepository());
    const client = await usecase.execute({
      name,
      email,
      address: {
        street,
        number,
        complement,
        city,
        state,
        zipCode,
      },
    });
    res.status(201).json(client);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});
