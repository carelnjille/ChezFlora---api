"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
const Order_1 = __importDefault(require("./Order"));
const Product_1 = __importDefault(require("./Product"));
class OrderDetail extends sequelize_1.Model {
}
OrderDetail.init({
    order_detail_id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    order_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Order_1.default,
            key: 'order_id',
        },
    },
    product_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product_1.default,
            key: 'product_id',
        },
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    sequelize: db_1.default,
    modelName: 'OrderDetail',
    tableName: 'order_details',
    timestamps: false,
});
exports.default = OrderDetail;
