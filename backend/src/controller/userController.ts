import { Request, Response } from "express";
import prisma from "../config/prisma";
import { buildSelectQuery } from "../model/queryBuilder";

//Handling error
import { StatusCodes } from "http-status-codes";
import {
  handleBadRequestResponse,
  handleNotFoundResponse,
  handleServerError,
  handleUnprocessableEntityResponse,
} from "../handle/error";

const userController = async () => {};

const allowedTables = ['users', 'products'] as const; // Nama tabel yang diizinkan
type AllowedTable = typeof allowedTables[number];

const getAll = async (req: Request, res: Response) => {
  const { table } = req.params;

  if (!allowedTables.includes(table)) {
    return res.status(400).json({ error: 'Invalid table name' });
  }

  try {
    const allowedTables: (keyof prisma)[] = ["user", "product"]; // Daftar model Prisma
    if (!allowedTables.includes(table as keyof PrismaClient)) {
      return res.status(400).json({ error: "Invalid table name" });
    }

    // Query dinamis menggunakan Prisma
    const data = await prisma[table].findMany();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  userController,
  getAll,
};
