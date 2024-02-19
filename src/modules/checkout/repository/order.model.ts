import { Column, Model, PrimaryKey } from "sequelize-typescript";

export default class OrderModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string;

  @Column({ allowNull: false, field: 'invoice_id'})
  declare invoiceId: string;

  @Column({ allowNull: false, field: 'client_id'})
  declare clientId: string;

  @Column({ allowNull: false})
  declare status: string;

  @Column({ allowNull: false})
  declare total: number;
}
