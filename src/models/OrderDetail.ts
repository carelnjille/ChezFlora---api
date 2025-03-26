import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import Order from './Order';
import Product from './Product';

class OrderDetail extends Model {
  public order_detail_id!: number;
  public order_id!: number;
  public product_id!: number;
  public quantity!: number;
  public price!: number;
}

OrderDetail.init(
  {
    order_detail_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'OrderDetail',
    tableName: 'order_details',
    timestamps: false,
  }
);

export default OrderDetail;
