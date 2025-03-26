"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.models = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const User_1 = __importDefault(require("./User"));
const Product_1 = __importDefault(require("./Product"));
const Order_1 = __importDefault(require("./Order"));
const Quote_1 = __importDefault(require("./Quote"));
const BlogPost_1 = __importDefault(require("./BlogPost"));
const Comment_1 = __importDefault(require("./Comment"));
// Configuration de la connexion à la base de données
const sequelize = new sequelize_1.Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: false, // Désactive les logs SQL
});
exports.sequelize = sequelize;
// Initialisation des modèles
const models = {
    User: User_1.default.initialize(sequelize),
    Product: Product_1.default.initialize(sequelize),
    Order: Order_1.default.initialize(sequelize),
    Quote: Quote_1.default.initialize(sequelize),
    BlogPost: BlogPost_1.default.initialize(sequelize),
    Comment: Comment_1.default.initialize(sequelize),
};
exports.models = models;
// Association des modèles
Object.values(models).forEach((model) => {
    if (model.associate) {
        model.associate(models);
    }
});
