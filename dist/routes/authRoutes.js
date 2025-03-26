"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Route pour l'inscription (register)
router.post('/register', authController_1.registerUser);
// Route pour la connexion (login)
router.post('/login', authController_1.loginUser);
// Route pour la déconnexion (logout) - Protégée par authentification
router.post('/logout', authMiddleware_1.authenticate, authController_1.logoutUser);
exports.default = router;
