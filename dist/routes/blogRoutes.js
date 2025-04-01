"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogController_1 = require("../controllers/blogController");
const router = express_1.default.Router();
// Route pour ajouter un article de blog
router.post('/blog', blogController_1.addBlogPost);
// Route pour récupérer un article de blog par son ID
router.get('/blog/:post_id', blogController_1.getBlogPostById);
// Route pour récupérer tous les articles de blog
router.get('/blog', blogController_1.getAllBlogPosts);
exports.default = router;
