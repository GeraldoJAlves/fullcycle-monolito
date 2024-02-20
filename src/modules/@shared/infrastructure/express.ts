import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { productRoute as productAdmRoute } from "@/modules/product-adm/infrastructure";
import { productRoute as StoreCatalogRoute } from "@/modules/store-catalog/infrastructure";
import { clientRoute } from "@/modules/client-adm/infrastructure";
import { ProductModel as ProductAdmModel } from "@/modules/product-adm/repository";
import { ProductModel as ProductStoreCatalogModel } from "@/modules/store-catalog/repository";
import { ClientModel } from "@/modules/client-adm/repository";

export const app: Express = express();
app.use(express.json());
app.use("/product", productAdmRoute);
app.use("/product", StoreCatalogRoute);
app.use("/client", clientRoute);

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });
  await sequelize.addModels([ClientModel, ProductStoreCatalogModel, ProductAdmModel]);
  await sequelize.sync();
}

setupDb();
