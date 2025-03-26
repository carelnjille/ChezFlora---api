"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Order extends sequelize_1.Model {
    // Méthode d'initialisation
    static initialize(sequelize) {
        this.init({
            order_id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            user_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            total_amount: {
                type: sequelize_1.DataTypes.FLOAT,
                allowNull: false,
            },
            status: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            created_at: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize_1.DataTypes.NOW,
            },
            updated_at: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize_1.DataTypes.NOW,
            },
        }, {
            sequelize,
            modelName: 'Order',
            tableName: 'orders',
            timestamps: false,
        });
        return this;
    }
    // Méthode d'association (optionnelle)
    static associate(models) {
        // Une commande appartient à un utilisateur
        this.belongsTo(models.User, { foreignKey: 'user_id' });
    }
}
exports.default = Order;
