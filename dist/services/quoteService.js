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
// Service pour les devis 
const Quote_1 = __importDefault(require("../models/Quote"));
const addQuote = (quoteData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Quote_1.default.create(quoteData);
});
exports.addQuote = addQuote;
const getQuoteById = (quoteId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Quote_1.default.findByPk(quoteId);
});
exports.getQuoteById = getQuoteById;
const getQuotesByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Quote_1.default.findAll({ where: { user_id: userId } });
});
exports.getQuotesByUserId = getQuotesByUserId;
