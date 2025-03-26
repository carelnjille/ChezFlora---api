import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, username, role } = req.body;

    // Validation des données d'entrée
    if (!email || !password || !username) {
      res.status(400).json({ message: 'Missing required fields: email, password, username' });
      return;
    }

    // Vérification si l'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // Hashage du mot de passe
    const saltRounds = 10; // Nombre de tours de hachage
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Création de l'utilisateur avec le mot de passe hashé
    const user = await User.create({
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
  } catch (error) {
    console.error('Error during registration:', error); // Log l'erreur pour le débogage
    res.status(500).json({ message: 'Error registering user', error: error});
  }
};

// Fonction pour la connexion (login)
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Recherche de l'utilisateur par email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Vérification du mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid password' });
      return;
    }

    // Génération du token JWT
    const token = jwt.sign(
      { user_id: user.user_id, role: user.role }, // Données à inclure dans le token
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
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

// Fonction pour la déconnexion (logout)
export const logoutUser = (req: Request, res: Response): void => {
  try {
    // Suppression du cookie contenant le token
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging out', error });
  }
};