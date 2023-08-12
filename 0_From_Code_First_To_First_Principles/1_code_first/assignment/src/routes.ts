import express from "express";
import { UserController } from "./user/userController";

const router = express.Router();

const userController = new UserController();

router.post("/users/new", userController.createUser);
router.post("/users/edit/:userId", userController.editUser);
router.get("/users", userController.getUserByEmail);

export default router;
