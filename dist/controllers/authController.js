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
exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, username, role } = req.body;
        // Validation des données d'entrée
        if (!email || !password || !username) {
            res.status(400).json({ message: 'Missing required fields: email, password, username' });
            return;
        }
        // Vérification si l'utilisateur existe déjà
        const existingUser = yield User_1.default.findOne({ where: { email } });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }
        // Hashage du mot de passe
        const saltRounds = 10; // Nombre de tours de hachage
        const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
        // Création de l'utilisateur avec le mot de passe hashé
        const user = yield User_1.default.create({
            email,
            password_hash: hashedPassword, // Assurez-vous que votre modèle utilise `password` et non `password_hash`
            username,
            role: role || 'client', // Utilise le rôle fourni ou 'client' par défaut
        });
        // Réponse réussie (ne renvoie pas le mot de passe hashé)
        const userResponse = {
            id: user.user_id,
            email: user.email,
            username: user.username,
            role: user.role,
        };
        res.status(201).json({ message: 'User registered successfully', user: userResponse });
    }
    catch (error) {
        console.error('Error during registration:', error); // Log l'erreur pour le débogage
        res.status(500).json({ message: 'Error registering user', error: error });
    }
});
exports.registerUser = registerUser;
// Fonction pour la connexion (login)
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Recherche de l'utilisateur par email
        const user = yield User_1.default.findOne({ where: { email } });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        // Vérification du mot de passe
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password_hash);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid password' });
            return;
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
// Fonction pour la déconnexion (logout)
const logoutUser = (req, res) => {
    try {
        // Suppression du cookie contenant le token
        res.clearCookie('token');
        res.status(200).json({ message: 'Logout successful' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error logging out', error });
    }
};
exports.logoutUser = logoutUser;
