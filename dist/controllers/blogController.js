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
exports.getAllBlogPosts = exports.getBlogPostById = exports.addBlogPost = void 0;
const BlogPost_1 = __importDefault(require("../models/BlogPost"));
const addBlogPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, author_id, image_url } = req.body;
        // Validation des données
        if (!title || !content || !author_id || !image_url) {
            res.status(400).json({ message: 'Missing required fields: title, content, author_id, image_url' });
            return;
        }
        // Créer l'article de blog
        const blogPost = yield BlogPost_1.default.create({ title, content, author_id, image_url });
        // Réponse réussie
        res.status(201).json({
            message: 'Blog post created successfully',
            blogPost,
        });
    }
    catch (error) {
        console.error('Error adding blog post:', error); // Log l'erreur pour le débogage
        res.status(500).json({ message: 'Error adding blog post', error: error });
    }
});
exports.addBlogPost = addBlogPost;
const getBlogPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { post_id } = req.params;
        // Trouver l'article de blog par son ID
        const blogPost = yield BlogPost_1.default.findByPk(post_id);
        if (blogPost) {
            // Réponse réussie
            res.status(200).json(blogPost);
        }
        else {
            // Si l'article n'existe pas
            res.status(404).json({ message: 'Blog post not found' });
        }
    }
    catch (error) {
        console.error('Error fetching blog post:', error); // Log l'erreur pour le débogage
        res.status(500).json({ message: 'Error fetching blog post', error: error });
    }
});
exports.getBlogPostById = getBlogPostById;
const getAllBlogPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Récupérer tous les articles de blog
        const blogPosts = yield BlogPost_1.default.findAll();
        // Réponse réussie
        res.status(200).json(blogPosts);
    }
    catch (error) {
        console.error('Error fetching blog posts:', error); // Log l'erreur pour le débogage
        res.status(500).json({ message: 'Error fetching blog posts', error: error });
    }
});
exports.getAllBlogPosts = getAllBlogPosts;
