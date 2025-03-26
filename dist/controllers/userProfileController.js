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
exports.getUserProfile = exports.addUserProfile = void 0;
const UserProfile_1 = __importDefault(require("../models/UserProfile"));
const addUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, bio, profile_picture, phone_number, address } = req.body;
        const userProfile = yield UserProfile_1.default.create({ user_id, bio, profile_picture, phone_number, address });
        res.status(201).json(userProfile);
    }
    catch (error) {
        res.status(500).json({ message: 'Error adding user profile', error });
    }
});
exports.addUserProfile = addUserProfile;
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.params;
        const userProfile = yield UserProfile_1.default.findOne({ where: { user_id } });
        res.status(200).json(userProfile);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching user profile', error });
    }
});
exports.getUserProfile = getUserProfile;
