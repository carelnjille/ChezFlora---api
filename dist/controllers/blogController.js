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
// Ajouter un article de blog
const addBlogPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, author_id, image_url } = req.body;
        const blogPost = yield BlogPost_1.default.create({ title, content, author_id, image_url });
        res.status(201).json(blogPost);
    }
    catch (error) {
        res.status(500).json({ message: 'Error adding blog post', error });
    }
});
exports.addBlogPost = addBlogPost;
// Récupérer un article de blog par ID
const getBlogPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { post_id } = req.params;
        const blogPost = yield BlogPost_1.default.findByPk(post_id);
        if (blogPost) {
            res.status(200).json(blogPost);
        }
        else {
            res.status(404).json({ message: 'Blog post not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching blog post', error });
    }
});
exports.getBlogPostById = getBlogPostById;
// Récupérer tous les articles de blog
const getAllBlogPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogPosts = yield BlogPost_1.default.findAll();
        res.status(200).json(blogPosts);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching blog posts', error });
    }
});
exports.getAllBlogPosts = getAllBlogPosts;
