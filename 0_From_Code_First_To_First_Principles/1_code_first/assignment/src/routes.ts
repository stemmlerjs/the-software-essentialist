import express from "express";
import { UserController } from "./user/userController";

const router = express.Router();

router.post("/users/new", UserController.createUser);
router.post("/users/edit/:userId", UserController.editUser);
router.get("/users", UserController.getUserByEmail);

export default router;
