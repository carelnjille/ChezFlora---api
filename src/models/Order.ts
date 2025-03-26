import { DataTypes, Model } from 'sequelize';
import { Sequelize } from 'sequelize';

class Order extends Model {
  public order_id!: number;
  public user_id!: number;
  public total_amount!: number;
  public status!: string;
  public created_at!: Date;
  public updated_at!: Date;

  // Méthode d'initialisation
  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        order_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        total_amount: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        status: {
          type: DataTypes.STRING,
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
        modelName: 'Order',
        tableName: 'orders',
        timestamps: false,
      }
    );
    return this;
  }

  // Méthode d'association (optionnelle)
  public static associate(models: any) {
    // Une commande appartient à un utilisateur
    this.belongsTo(models.User, { foreignKey: 'user_id' });
  }
}

export default Order;