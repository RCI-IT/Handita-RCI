import { Router } from "express";
// const { validateTableName } = require("../middleware/validTable");
import { uploads } from "../utils/UploadSertification";
const SertifController = require ('../controller/sertificationController')

export const Sertification: Router = Router();

Sertification.get("/", SertifController.getAll);
Sertification.get("/:id", SertifController.getById);
Sertification.post("/", uploads, SertifController.createCertificate);
Sertification.put("/:id", uploads, SertifController.putCertificate);
Sertification.delete("/:id", SertifController.deleteCertificate);
