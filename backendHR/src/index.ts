import express, { Application, Request, Response } from "express";
import dotenv from "dotenv"; // untuk membaca environment
import { StatusCodes } from "http-status-codes"; // Untuk error handling
// import userRoutes from "./routes/UserRoutes"
import { Employee } from "./routes/EmployeeRoutes";
const cors = require('cors');

// import {Employee} from "./routes/EmployeeRoutes";

dotenv.config();

const app: Application = express();
const PORT: any = process.env.PORT;

// Konfigurasi CORS
const corsOptions = {
  origin: ["http://localhost:3000", '*'], // Domain frontend
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"], // Tambahkan header yang diperlukan
  credentials: true, // Jika menggunakan cookie
};


app.use(express.json());
app.use(cors(corsOptions));

// app.use("/v1", userRoutes);
app.use('/api/employees', Employee);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Prisma with PostgreSQL!");
});

// Error Handling
app.use((_req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).send("Not Found");
});
app.use((err: any, _req: Request, res: Response) => {
  console.error(err.stack);
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal Server Error");
});

// Server Setup
app.listen(PORT, () => {
  console.log("Server running on http://localhost:4000");
});
