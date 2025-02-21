"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validTables = ["users", "orders", "products"]; // Daftar tabel yang valid
const validateTableName = (req, res, next) => {
    const tableName = req.params.table;
    if (!validTables.includes(tableName)) {
        return res.status(400).send("Invalid table name.");
    }
    next();
};
module.exports = {
    validateTableName,
};
