"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Routes pour les devis 
const express_1 = __importDefault(require("express"));
const quoteController_1 = require("../controllers/quoteController");
const router = express_1.default.Router();
router.post('/quotes', quoteController_1.addQuote);
router.get('/quotes/:quote_id', quoteController_1.getQuoteById);
router.get('/quotes/user/:user_id', quoteController_1.getQuotesByUserId);
exports.default = router;
