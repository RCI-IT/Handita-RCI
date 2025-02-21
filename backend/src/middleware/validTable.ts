import { Request, Response, NextFunction } from "express";

const validTables = ["users", "orders", "products"]; // Daftar tabel yang valid

const validateTableName = (req: Request, res: Response, next: NextFunction) => {
  const tableName = req.params.table;
  if (!validTables.includes(tableName)) {
    return res.status(400).send("Invalid table name.");
  }
  next();
};

module.exports = {
  validateTableName,
};
