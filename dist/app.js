"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const db_1 = __importDefault(require("./config/db")); // Assurez-vous que le chemin est correct
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const quoteRoutes_1 = __importDefault(require("./routes/quoteRoutes"));
const blogRoutes_1 = __importDefault(require("./routes/blogRoutes"));
const commentRoutes_1 = __importDefault(require("./routes/commentRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware pour parser les cookies
app.use((0, cookie_parser_1.default)());
// Configuration CORS
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL || 'http://localhost:3000', // Autoriser uniquement cette origine
    credentials: true, // Autoriser les cookies
}));
// Middleware pour parser le JSON
app.use(express_1.default.json());
// Routes
app.use('/api/products', productRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
app.use('/api/auth', authRoutes_1.default);
app.use('/api/orders', orderRoutes_1.default);
app.use('/api/quotes', quoteRoutes_1.default);
app.use('/api/blog', blogRoutes_1.default);
app.use('/api/comments', commentRoutes_1.default);
// Middleware pour gérer les erreurs globales
app.use((err, req, res, next) => {
    console.error('Global error handler:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
});
// Tester la connexion à la base de données
db_1.default.authenticate()
    .then(() => {
    console.log('Database connection has been established successfully.');
})
    .catch((error) => {
    console.error('Unable to connect to the database:', error);
});
// Synchroniser les modèles avec la base de données
db_1.default.sync({ force: false }) // `force: false` pour ne pas écraser les tables existantes
    .then(() => {
    console.log('Database synced');
})
    .catch((error) => {
    console.error('Error syncing database:', error);
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
