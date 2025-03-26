import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class Promotion extends Model {
  public promotion_id!: number;
  public product_id!: number;
  public discount!: number;
  public start_date!: Date;
  public end_date!: Date;
}

Promotion.init(
  {
    promotion_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    discount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Promotion',
    tableName: 'promotions',
    timestamps: false,
  }
);

export default Promotion;