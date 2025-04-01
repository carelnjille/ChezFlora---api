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
exports.getUserProfile = exports.loginUser = exports.registerUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, username, role } = req.body;
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = yield User_1.default.create({ email, password_hash: hashedPassword, username, role });
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Recherche de l'utilisateur par email
        const user = yield User_1.default.findOne({ where: { email } });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return; // Retourne ici pour éviter d'exécuter le reste de la fonction
        }
        // Vérification du mot de passe
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password_hash);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid password' });
            return; // Retourne ici pour éviter d'exécuter le reste de la fonction
        }
        // Génération du token JWT
        const token = jsonwebtoken_1.default.sign({ user_id: user.user_id, role: user.role }, // Données à inclure dans le token
        process.env.JWT_SECRET || 'secret', // Clé secrète pour signer le token
        { expiresIn: '1h' } // Durée de validité du token
        );
        // Envoi du token dans un cookie sécurisé
        res.cookie('token', token, {
            httpOnly: true, // Le cookie n'est accessible que par le serveur
            secure: process.env.NODE_ENV === 'production', // Cookie sécurisé en production (HTTPS)
            maxAge: 3600000, // Durée de validité du cookie (1 heure)
            sameSite: 'strict', // Protection contre les attaques CSRF
        });
        // Réponse réussie
        res.status(200).json({ message: 'Login successful', token });
    }
    catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
});
exports.loginUser = loginUser;
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.params;
        const user = yield User_1.default.findByPk(user_id);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching user profile', error });
    }
});
exports.getUserProfile = getUserProfile;
