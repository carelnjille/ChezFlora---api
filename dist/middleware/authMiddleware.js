"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticate = (req, res, next) => {
    var _a;
    // Récupération du token depuis les cookies ou l'en-tête Authorization
    const token = req.cookies.token || ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]);
    if (!token) {
        res.status(401).json({ message: 'Access denied. No token provided.' });
        return; // Retourne ici pour éviter d'exécuter `next()`
    }
    try {
        // Vérification du token
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'secret');
        // Ajout des informations de l'utilisateur à l'objet `req` avec une assertion de type
        req.user = { id: decoded.user_id, role: decoded.role }; // Ensure user property is defined
        next(); // Passage au middleware ou au contrôleur suivant
    }
    catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};
exports.authenticate = authenticate;
