import { Router } from "express";
// const { validateTableName } = require("../middleware/validTable");
import { uploads } from "../utils/UploadSertification";
const Sertification = require ('../controller/sertificationController')

export const Employee: Router = Router();

Employee.get("/", Sertification.getAll);
Employee.get("/:id", Sertification.getById);
Employee.post("/", uploads, Sertification.createEmployee);
Employee.put("/:id", uploads, Sertification.putEmployee);
Employee.delete("/:id", Sertification.deleteEmployee);
