import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: "orders",
  timestamps: false,
})
export default class OrderModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string;

  @Column({ allowNull: false, field: "invoice_id" })
  declare invoiceId: string;

  @Column({ allowNull: false, field: "client_id" })
  declare clientId: string;

  @Column({ allowNull: false })
  declare status: string;
}
