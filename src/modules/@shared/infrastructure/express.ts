import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "@/modules/product-adm/repository/product.model";
import { productRoute } from "@/modules/product-adm/infrastructure/index";

export const app: Express = express();
app.use(express.json());
app.use("/product", productRoute);

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });
  await sequelize.addModels([ProductModel]);
  await sequelize.sync();
}

setupDb();
