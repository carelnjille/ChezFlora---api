"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController_1 = require("../controllers/orderController");
const router = express_1.default.Router();
// Route pour ajouter une commande
router.post('/orders', orderController_1.addOrder);
// Route pour récupérer une commande par ID
router.get('/orders/:order_id', orderController_1.getOrderById);
// Route pour récupérer toutes les commandes d'un utilisateur
router.get('/orders/user/:user_id', orderController_1.getOrdersByUserId);
// Route pour récupérer les détails d'une commande
router.get('/orders/:order_id/details', orderController_1.getOrderDetails);
exports.default = router;
