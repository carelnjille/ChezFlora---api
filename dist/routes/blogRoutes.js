"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Routes pour le blog 
const express_1 = __importDefault(require("express"));
const blogController_1 = require("../controllers/blogController");
const router = express_1.default.Router();
router.post('/blog', blogController_1.addBlogPost);
router.get('/blog/:post_id', blogController_1.getBlogPostById);
router.get('/blog', blogController_1.getAllBlogPosts);
exports.default = router;
