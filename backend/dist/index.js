"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv")); // untuk membaca environment
const http_status_codes_1 = require("http-status-codes"); // Untuk error handling
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
const cors = require('cors');
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
// Konfigurasi CORS
const corsOptions = {
    origin: ["http://localhost:3000", '*'], // Domain frontend
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"], // Tambahkan header yang diperlukan
    credentials: true, // Jika menggunakan cookie
};
app.use(express_1.default.json());
app.use(cors(corsOptions));
app.use("/api/v1", UserRoutes_1.default);
app.get("/", (req, res) => {
    res.send("Welcome to Prisma with PostgreSQL!");
});
// Error Handling
app.use((_req, res) => {
    res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send("Not Found");
});
app.use((err, _req, res) => {
    console.error(err.stack);
    res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send("Internal Server Error");
});
// Server Setup
app.listen(PORT, () => {
    console.log("Server running on http://localhost:3000");
});
