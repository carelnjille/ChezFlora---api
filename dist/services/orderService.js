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
exports.getOrdersByUserId = exports.getOrderById = exports.addOrder = void 0;
// Service pour les commandes 
const Order_1 = __importDefault(require("../models/Order"));
const addOrder = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Order_1.default.create(orderData);
});
exports.addOrder = addOrder;
const getOrderById = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Order_1.default.findByPk(orderId);
});
exports.getOrderById = getOrderById;
const getOrdersByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Order_1.default.findAll({ where: { user_id: userId } });
});
exports.getOrdersByUserId = getOrdersByUserId;
