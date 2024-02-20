import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";

import { productRoute as StoreCatalogRoute } from "@/modules/store-catalog/infrastructure";
import { productRoute as productAdmRoute } from "@/modules/product-adm/infrastructure";
import { clientRoute } from "@/modules/client-adm/infrastructure";
import { checkoutRoute } from "@/modules/checkout/infrastructure";
import { invoiceRoute } from "@/modules/invoice/infrastructure";

import { ProductModel as ProductAdmModel } from "@/modules/product-adm/repository";
import { ProductModel as ProductStoreCatalogModel } from "@/modules/store-catalog/repository";
import { OrderModel } from "@/modules/checkout/repository";
import { InvoiceItemModel, InvoiceModel } from "@/modules/invoice/repository";
import { ClientModel } from "@/modules/client-adm/repository";
import { TransactionModel } from "@/modules/payment/repository";

export const app: Express = express();
app.use(express.json());
app.use("/product", productAdmRoute);
app.use("/product", StoreCatalogRoute);
app.use("/client", clientRoute);
app.use("/checkout", checkoutRoute);
app.use("/invoice", invoiceRoute);

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });
  await sequelize.addModels([
    ClientModel,
    ProductStoreCatalogModel,
    ProductAdmModel,
    OrderModel,
    InvoiceModel,
    InvoiceItemModel,
    TransactionModel,
  ]);
  await sequelize.sync();
}

setupDb();
