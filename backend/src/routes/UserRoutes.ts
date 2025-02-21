import { Router } from "express";
const {validateTableName} = require("../middleware/validTable")
// import userController from "../controller/userController";
const userController = require("../controller/userController");

const user = Router();
// export const User: user = Router()
// Routes dengan export di awal
// User.get('/profile/', conroller)

// Routes dengan eksport di akhir
user.get("/:table", validateTableName, (req, res) => {
  const tableName = req.body.table;
  userController.getAll(req, res, tableName);
});

export default user;
