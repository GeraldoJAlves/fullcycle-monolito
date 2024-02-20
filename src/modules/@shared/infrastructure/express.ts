import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { productRoute } from "@/modules/product-adm/infrastructure";
import { clientRoute } from "@/modules/client-adm/infrastructure";
import { ProductModel } from "@/modules/product-adm/repository";
import { ClientModel } from "@/modules/client-adm/repository";

export const app: Express = express();
app.use(express.json());
app.use("/product", productRoute);
app.use("/client", clientRoute);

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });
  await sequelize.addModels([ProductModel, ClientModel]);
  await sequelize.sync();
}

setupDb();
