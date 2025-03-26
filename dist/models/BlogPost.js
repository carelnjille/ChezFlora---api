"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class BlogPost extends sequelize_1.Model {
    // Méthode d'initialisation
    static initialize(sequelize) {
        this.init({
            post_id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            title: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            content: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
            },
            author_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            image_url: {
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
            modelName: 'BlogPost',
            tableName: 'blog_posts',
            timestamps: false,
        });
        return this;
    }
    // Méthode d'association (optionnelle)
    static associate(models) {
        // Exemple : Un article de blog appartient à un utilisateur
        this.belongsTo(models.User, { foreignKey: 'author_id' });
    }
}
exports.default = BlogPost;
