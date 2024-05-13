import express from "express";
import { database } from "./shared/database/";
import cors from "cors";
import { UsersController, UsersService } from "./modules";

const app = express();
const usersService = new UsersService(database);
const usersController = new UsersController(usersService);

app.use(express.json());
app.use(cors());
app.use(usersController.getRouter());

const port = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

export { app };
