"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Quote extends sequelize_1.Model {
    // Méthode d'initialisation
    static initialize(sequelize) {
        this.init({
            quote_id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            user_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            event_type: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            event_date: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
            },
            description: {
                type: sequelize_1.DataTypes.TEXT,
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
            modelName: 'Quote',
            tableName: 'quotes',
            timestamps: false,
        });
        return this;
    }
    // Méthode d'association (optionnelle)
    static associate(models) {
        // Un devis appartient à un utilisateur
        this.belongsTo(models.User, { foreignKey: 'user_id' });
    }
}
exports.default = Quote;
