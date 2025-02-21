"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildSelectQuery = void 0;
const buildSelectQuery = (table, filters = {}, sort = "id", limit = 10, offset = 0) => {
    const conditions = Object.keys(filters)
        .map((key, index) => {
        // Escape nama kolom untuk mencegah SQL Injection
        const safeKey = key.replace(/[^a-zA-Z0-9_]/g, "");
        return `${safeKey} ILIKE '%' || $${index + 1} || '%'`;
    })
        .join(" AND ");
    const query = `
      SELECT * FROM ${table}
      ${conditions ? `WHERE ${conditions}` : ""}
      ORDER BY ${sort}
      LIMIT ${limit} OFFSET ${offset}
    `;
    const values = Object.values(filters);
    return { query, values };
};
exports.buildSelectQuery = buildSelectQuery;
