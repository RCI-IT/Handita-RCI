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
const prisma_1 = __importDefault(require("../config/prisma"));
const queryBuilder_1 = require("../model/queryBuilder");
const userController = () => __awaiter(void 0, void 0, void 0, function* () { });
const getAll = (req, res, table) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const employee = await prisma.employees.findMany()
        // Access table dynamically
        const { filters, sort, limit, offset } = req.query;
        // Konversi filters ke format yang diinginkan
        const parsedFilters = filters
            ? JSON.parse(filters) // Pastikan filter dalam format JSON dari frontend
            : {};
        // const offset = (page - 1) * limit;
        // Gunakan query builder
        const { query, values } = (0, queryBuilder_1.buildSelectQuery)(table, parsedFilters, sort || "id", parseInt(limit) || 10, parseInt(offset) || 0);
        // Eksekusi query
        const results = yield prisma_1.default.$queryRawUnsafe(query, ...values);
        res.status(200).json({ success: true, data: results });
    }
    catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});
module.exports = {
    userController,
    getAll,
};
