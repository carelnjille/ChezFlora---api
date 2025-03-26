"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderDetails = exports.getOrdersByUserId = exports.getOrderById = exports.addOrder = void 0;
const Order_1 = __importDefault(require("../models/Order"));
const OrderDetail_1 = __importDefault(require("../models/OrderDetail"));
const emailService_1 = require("../utils/emailService");
const User_1 = __importDefault(require("../models/User")); // Assurez-vous d'importer le modèle User
// Ajouter une commande
const addOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, total_amount, status, products } = req.body;
        const order = yield Order_1.default.create({ user_id, total_amount, status });
        // Ajouter les détails de la commande
        for (const product of products) {
            yield OrderDetail_1.default.create({
                order_id: order.order_id,
                product_id: product.product_id,
                quantity: product.quantity,
                price: product.price,
            });
        }
        // Envoi d'un email de confirmation
        const user = yield User_1.default.findByPk(user_id);
        if (user) {
            yield (0, emailService_1.sendEmail)(user.email, 'Confirmation de commande', 'Votre commande a été passée avec succès.');
        }
        res.status(201).json(order);
    }
    catch (error) {
        res.status(500).json({ message: 'Error adding order', error });
    }
});
exports.addOrder = addOrder;
// Récupérer une commande par ID
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { order_id } = req.params;
        const order = yield Order_1.default.findByPk(order_id);
        if (order) {
            res.status(200).json(order);
        }
        else {
            res.status(404).json({ message: 'Order not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching order', error });
    }
});
exports.getOrderById = getOrderById;
// Récupérer toutes les commandes d'un utilisateur
const getOrdersByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.params;
        const orders = yield Order_1.default.findAll({ where: { user_id } });
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error });
    }
});
exports.getOrdersByUserId = getOrdersByUserId;
// Récupérer les détails d'une commande
const getOrderDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { order_id } = req.params;
        const orderDetails = yield OrderDetail_1.default.findAll({ where: { order_id } });
        res.status(200).json(orderDetails);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching order details', error });
    }
});
exports.getOrderDetails = getOrderDetails;
