import { Router } from "express";
const { validateTableName } = require("../middleware/validTable");
// import userController from "../controller/userController";
const userController = require("../controller/userController");

const user = Router();
// export const User: user = Router()
// Routes dengan export di awal
// User.get('/profile/', conroller)

// Routes dengan eksport di akhir
// user.get("/:table", validateTableName, (req, res) => {
//   const tableName = req.body.table;
//   userController.getAll(req, res, tableName);
// });

user.get("/users", userController.getAll);

// User.get('/', AuthMiddleware, UserController.getAllUser)
// User.get('/:id', AuthMiddleware, UserController.getByIdUser)
// User.post('/', AuthMiddleware, UserController.createUser)
// //Legal.put('/:id', UserController.)
// User.delete('/:id', AuthMiddleware, UserController.deleteUser)

export default user;
