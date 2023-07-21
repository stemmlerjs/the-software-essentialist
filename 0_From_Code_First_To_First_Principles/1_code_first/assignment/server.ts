import express, { Request, Response } from "express";
import bodyParser from "body-parser";

import path from "path";
import {
  createUser,
  getUserByKeys,
  hasUserWithKeys,
  updateUser,
} from "./public/controllers/userController";
import { User } from "@prisma/client";

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Route handler for the root request ("/")
app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/users/new", async (req: Request, res: Response) => {
  const { email, userName, firstName, lastName, password } = req.body;

  try {
    // Check if the userName is already taken
    if (await hasUserWithKeys({ userName })) {
      return res.status(409).json({
        error: "UsernameAlreadyTaken",
        data: undefined,
        success: false,
      });
    }

    // Check if the email is already in use
    if (await hasUserWithKeys({ email })) {
      return res.status(409).json({
        error: "EmailAlreadyInUse",
        data: undefined,
        success: false,
      });
    }

    // Create the user
    const user: User | null = await createUser({
      email,
      userName,
      firstName,
      lastName,
      password,
    });

    return res.status(201).json({
      error: undefined,
      data: user,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      error: "ValidationError",
      data: undefined,
      success: false,
    });
  }
});

app.post("/users/edit/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { email, userName, firstName, lastName, password } = req.body;

  try {
    // Check if the user with the given userId exists

    if (!hasUserWithKeys({ id: parseInt(userId) })) {
      return res.status(404).json({
        error: "UserNotFound",
        data: undefined,
        success: false,
      });
    }

    if (userName) {
      const existingUser = await getUserByKeys({ userName });

      // Check if the userName is already taken by another user
      if (existingUser && existingUser.id !== parseInt(userId)) {
        return res.status(409).json({
          error: "UsernameAlreadyTaken",
          data: undefined,
          success: false,
        });
      }
    }

    if (email) {
      const existingUser = await getUserByKeys({ email });

      // Check if the email is already in use by another user
      if (existingUser && existingUser.id !== existingUser.id) {
        return res.status(409).json({
          error: "EmailAlreadyInUse",
          data: undefined,
          success: false,
        });
      }
    }

    // Update the user information
    const updatedUser: User | null = await updateUser(userId, {
      email,
      userName,
      firstName,
      lastName,
      password,
    });

    return res.status(200).json({
      error: undefined,
      data: {
        id: updatedUser?.id,
        email: updatedUser?.email,
        username: updatedUser?.userName,
        firstName: updatedUser?.firstName,
        lastName: updatedUser?.lastName,
      },
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      error: "ValidationError",
      data: undefined,
      success: false,
    });
  }
});

// API endpoint for getting a user by email
app.get("/users", async (req: Request, res: Response) => {
  const { email } = req.query;

  try {
    // Find the user with the given email
    const user: User | null = await getUserByKeys({ email: email as string });
    if (!user) {
      return res.status(404).json({
        error: "UserNotFound",
        data: undefined,
        success: false,
      });
    }

    return res.status(200).json({
      error: undefined,
      data: {
        id: user.id,
        email: user.email,
        username: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "ServerError",
      data: undefined,
      success: false,
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
