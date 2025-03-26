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
exports.getQuotesByUserId = exports.getQuoteById = exports.addQuote = void 0;
const Quote_1 = __importDefault(require("../models/Quote"));
// Ajouter un devis
const addQuote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, event_type, event_date, description, status } = req.body;
        const quote = yield Quote_1.default.create({ user_id, event_type, event_date, description, status });
        res.status(201).json(quote);
    }
    catch (error) {
        res.status(500).json({ message: 'Error adding quote', error });
    }
});
exports.addQuote = addQuote;
// Récupérer un devis par ID
const getQuoteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { quote_id } = req.params;
        const quote = yield Quote_1.default.findByPk(quote_id);
        if (quote) {
            res.status(200).json(quote);
        }
        else {
            res.status(404).json({ message: 'Quote not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching quote', error });
    }
});
exports.getQuoteById = getQuoteById;
// Récupérer tous les devis d'un utilisateur
const getQuotesByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.params;
        const quotes = yield Quote_1.default.findAll({ where: { user_id } });
        res.status(200).json(quotes);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching quotes', error });
    }
});
exports.getQuotesByUserId = getQuotesByUserId;
