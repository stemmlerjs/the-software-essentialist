import express from "express";
import { UserTypeormRepository } from "../domain/typeorm-user-repo";
import { userRequestSchema } from "./user-schema";
import { User } from "../domain/user";
const CreateError = require("http-errors");

const userRouter = express.Router();

const formatUserForResponse = (user: User) => {
  return {
    id: user.id,
    email: user.email,
    userName: user.userName,
    firstName: user.firstName,
    lastName: user.lastName,
  };
};

userRouter.get("/:userId", async (req: any, res: any, next) => {
  const { userId } = req.params;
  try {
    const repo = await UserTypeormRepository.factory();
    const user = await repo.getUserByUserId(userId);

    if (!user) {
      throw new CreateError(404, "User not found");
    }

    res.send({ data: formatUserForResponse(user), success: true });
  } catch (error) {
    next(error);
  }
});

userRouter.post("/new", async (req: any, res: any, next: any) => {
  try {
    userRequestSchema.validateSync(req.body, { abortEarly: false });
    const repo = await UserTypeormRepository.factory();
    if (await repo.exists(req.body.email)) {
      throw new CreateError(409, "EmailAlreadyInUse");
    }

    if (await repo.getUserByUserName(req.body.userName)) {
      throw new CreateError(409, "UserNameAlreadyInUse");
    }

    const newUser = await repo.save(
      new User({
        ...req.body,
        password: Math.random().toString(36).slice(-8),
      })
    );

    res
      .status(201)
      .send({ success: true, data: formatUserForResponse(newUser) });
  } catch (error) {
    next(error);
  }
});

userRouter.post("/edit/:userId", async (req: any, res: any, next: any) => {
  try {
    userRequestSchema.validateSync(req.body, { abortEarly: false });
    const repo = await UserTypeormRepository.factory();

    const updatedUser = await repo.save(new User(req.body));

    res.status(200).send(res.send({ success: true, data: updatedUser }));
  } catch (error) {
    next(error);
  }
});

export { userRouter };
