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
exports.checkLowStock = exports.getProductsByCategory = exports.getAllProducts = exports.getProductById = exports.deleteProduct = exports.updateProduct = exports.addProduct = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const sequelize_1 = require("sequelize"); // Assurez-vous d'importer Op pour les opérations de comparaison
// Ajouter un produit
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, price, category, stock_quantity, image_url } = req.body;
        const product = yield Product_1.default.create({ name, description, price, category, stock_quantity, image_url });
        res.status(201).json(product);
    }
    catch (error) {
        res.status(500).json({ message: 'Error adding product', error });
    }
});
exports.addProduct = addProduct;
// Mettre à jour un produit
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product_id } = req.params;
        const { name, description, price, category, stock_quantity, image_url } = req.body;
        const [updated] = yield Product_1.default.update({ name, description, price, category, stock_quantity, image_url }, { where: { product_id } });
        if (updated) {
            const updatedProduct = yield Product_1.default.findByPk(product_id);
            res.status(200).json(updatedProduct);
        }
        else {
            res.status(404).json({ message: 'Product not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating product', error });
    }
});
exports.updateProduct = updateProduct;
// Supprimer un produit
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product_id } = req.params;
        const deleted = yield Product_1.default.destroy({ where: { product_id } });
        if (deleted) {
            res.status(204).json({ message: 'Product deleted' });
        }
        else {
            res.status(404).json({ message: 'Product not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
});
exports.deleteProduct = deleteProduct;
// Récupérer un produit par ID
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product_id } = req.params;
        const product = yield Product_1.default.findByPk(product_id);
        if (product) {
            res.status(200).json(product);
        }
        else {
            res.status(404).json({ message: 'Product not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching product', error });
    }
});
exports.getProductById = getProductById;
// Récupérer tous les produits
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield Product_1.default.findAll();
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
});
exports.getAllProducts = getAllProducts;
// Récupérer les produits par catégorie
const getProductsByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category } = req.params;
        const products = yield Product_1.default.findAll({ where: { category } });
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching products by category', error });
    }
});
exports.getProductsByCategory = getProductsByCategory;
// Vérifier les produits en faible stock
const checkLowStock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield Product_1.default.findAll({ where: { stock_quantity: { [sequelize_1.Op.lt]: 10 } } }); // Exemple : alerte si stock < 10
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ message: 'Error checking low stock', error });
    }
});
exports.checkLowStock = checkLowStock;
