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
exports.getCommentsByPostId = exports.addComment = void 0;
const Comment_1 = __importDefault(require("../models/Comment"));
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { post_id, user_id, content } = req.body;
        const comment = yield Comment_1.default.create({ post_id, user_id, content });
        res.status(201).json(comment);
    }
    catch (error) {
        res.status(500).json({ message: 'Error adding comment', error });
    }
});
exports.addComment = addComment;
const getCommentsByPostId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { post_id } = req.params;
        const comments = yield Comment_1.default.findAll({ where: { post_id } });
        res.status(200).json(comments);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching comments', error });
    }
});
exports.getCommentsByPostId = getCommentsByPostId;
