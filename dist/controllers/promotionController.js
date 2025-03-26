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
exports.addPromotion = void 0;
const Promotion_1 = __importDefault(require("../models/Promotion"));
const addPromotion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product_id, discount, start_date, end_date } = req.body;
        const promotion = yield Promotion_1.default.create({ product_id, discount, start_date, end_date });
        res.status(201).json(promotion);
    }
    catch (error) {
        res.status(500).json({ message: 'Error adding promotion', error });
    }
});
exports.addPromotion = addPromotion;
