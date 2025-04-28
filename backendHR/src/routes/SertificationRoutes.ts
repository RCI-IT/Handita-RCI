import { Router } from "express";
// const { validateTableName } = require("../middleware/validTable");
import { uploads } from "../utils/UploadSertification";
const SertifController = require ('../controller/sertificationController')

export const Sertification: Router = Router();

Sertification.get("/", SertifController.getAll);
Sertification.get("/:id", SertifController.getById);
Sertification.post("/", uploads, SertifController.createSertification);
// Sertification.put("/:id", uploads, SertifController.putSertification);
// Sertification.delete("/:id", SertifController.deleteEmployee);
