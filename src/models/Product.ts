import { DataTypes, Model, Sequelize } from 'sequelize';

class Product extends Model {
  public product_id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public category!: string;
  public stock_quantity!: number;
  public created_at!: Date;
  public updated_at!: Date;

  // Ajout de la méthode initialize()
  static initialize(sequelize: Sequelize) {
    Product.init(
      {
        product_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        category: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        stock_quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        modelName: 'Product',
        tableName: 'products',
        timestamps: false, // Désactivé car tu gères created_at/updated_at manuellement
      }
    );
  }
}

export default Product;
