import { UserController } from "./controller/user.controller";

const prisma = require("./conf/prismaClient");
const express = require("express");
const app = express();

app.use(express.json());

app.post("/users/edit/:userId", UserController.editUser);

app.post("/users/new", UserController.createUser);

app.get("/users", UserController.getUser);

const port = 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
