import express from "express";
import bodyParser from "body-parser";
import { UserController } from "./user/userController";

const app = express();
app.use(bodyParser.json());

app.post("/users/new", UserController.newUser);
app.post("/users/edit/:userId", UserController.editUser);
app.get("/users", UserController.getUserByEmail);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
