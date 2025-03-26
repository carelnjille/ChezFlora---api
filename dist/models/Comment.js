"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Comment extends sequelize_1.Model {
    // Méthode d'initialisation
    static initialize(sequelize) {
        this.init({
            comment_id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            post_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            user_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            content: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
            },
            created_at: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize_1.DataTypes.NOW,
            },
        }, {
            sequelize,
            modelName: 'Comment',
            tableName: 'comments',
            timestamps: false,
        });
        return this;
    }
    // Méthode d'association (optionnelle)
    static associate(models) {
        // Un commentaire appartient à un article de blog
        this.belongsTo(models.BlogPost, { foreignKey: 'post_id' });
        // Un commentaire appartient à un utilisateur
        this.belongsTo(models.User, { foreignKey: 'user_id' });
    }
}
exports.default = Comment;
