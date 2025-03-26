"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const router = express_1.default.Router();
// Route pour ajouter un produit
router.post('/products', productController_1.addProduct);
// Route pour mettre à jour un produit
router.put('/products/:product_id', productController_1.updateProduct);
// Route pour supprimer un produit
router.delete('/products/:product_id', productController_1.deleteProduct);
// Route pour récupérer un produit par ID
router.get('/products/:product_id', productController_1.getProductById);
// Route pour récupérer tous les produits
router.get('/products', productController_1.getAllProducts);
// Route pour récupérer les produits par catégorie
router.get('/products/category/:category', productController_1.getProductsByCategory);
// Route pour vérifier les produits en faible stock
router.get('/products/low-stock', productController_1.checkLowStock);
exports.default = router;
