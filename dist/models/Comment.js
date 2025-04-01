"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
const BlogPost_1 = __importDefault(require("./BlogPost")); // Importez le modèle BlogPost
class Comment extends sequelize_1.Model {
}
Comment.init({
    comment_id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    post_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: BlogPost_1.default, // Référence à la table BlogPost
            key: 'post_id',
        },
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
    sequelize: db_1.default,
    modelName: 'Comment',
    tableName: 'comments',
    timestamps: false, // Désactiver les timestamps natifs de Sequelize
});
// Définir la relation entre BlogPost et Comment
BlogPost_1.default.hasMany(Comment, { foreignKey: 'post_id' });
Comment.belongsTo(BlogPost_1.default, { foreignKey: 'post_id' });
exports.default = Comment;
