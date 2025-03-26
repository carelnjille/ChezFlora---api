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
exports.getProductsByCategory = exports.getAllProducts = exports.getProductById = exports.deleteProduct = exports.updateProduct = exports.addProduct = void 0;
// Service pour les produits 
const Product_1 = __importDefault(require("../models/Product"));
const addProduct = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Product_1.default.create(productData);
});
exports.addProduct = addProduct;
const updateProduct = (productId, productData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Product_1.default.update(productData, { where: { product_id: productId } });
});
exports.updateProduct = updateProduct;
const deleteProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Product_1.default.destroy({ where: { product_id: productId } });
});
exports.deleteProduct = deleteProduct;
const getProductById = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Product_1.default.findByPk(productId);
});
exports.getProductById = getProductById;
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield Product_1.default.findAll();
});
exports.getAllProducts = getAllProducts;
const getProductsByCategory = (category) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Product_1.default.findAll({ where: { category } });
});
exports.getProductsByCategory = getProductsByCategory;
