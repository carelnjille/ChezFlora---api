"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Routes pour les commentaires 
const express_1 = __importDefault(require("express"));
const commentController_1 = require("../controllers/commentController");
const router = express_1.default.Router();
router.post('/comments', commentController_1.addComment);
router.get('/comments/post/:post_id', commentController_1.getCommentsByPostId);
exports.default = router;
