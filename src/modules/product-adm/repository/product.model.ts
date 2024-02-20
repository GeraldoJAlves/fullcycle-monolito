import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: "products",
  timestamps: false,
})
export default class ProductModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare description: string;

  @Column({ allowNull: false, field: 'price'})
  declare purchasePrice: number;

  @Column({ allowNull: false })
  declare stock: number;

  @Column({ allowNull: false, field: 'created_at'})
  declare createdAt: Date;

  @Column({ allowNull: false, field: 'udpated_at'})
  declare updatedAt: Date;
}
