import { Router } from "express";
// const { validateTableName } = require("../middleware/validTable");
import { UploadSertification } from "../utils/UploadSertification";
const Sertification = require ('../controller/sertificationController')

export const Employee: Router = Router();

Employee.get("/", Sertification.getAll);
Employee.get("/:id", Sertification.getById);
Employee.post("/", UploadSertification, Sertification.createEmployee);
Employee.put("/:id", UploadSertification, Sertification.putEmployee);
Employee.delete("/:id", Sertification.deleteEmployee);
