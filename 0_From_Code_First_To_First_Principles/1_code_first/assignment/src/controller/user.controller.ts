import express, { Request, Response } from "express";
import prisma from "../conf/prismaClient";
import usernameAlreadyTakenException from "../exceptions/userNameAlreadyTakenException";
import { randomUUID } from "crypto";
import { ICreateUserResponse } from "./CreateUser/ICreateUserResponse";
import { ICreateUserRequest } from "./CreateUser/ICreateUserRequest";
import validationError from "../exceptions/validationError";
import { HttpStatusCode } from "../utils/enums/statusCode";
import { User } from "@prisma/client";
import emailAlreadyInUseException from "../exceptions/emailAlreadyInUseException";

export class UserController {
  constructor() {}

  static async createUser(
    req: Request<{}, {}, ICreateUserRequest>,
    res: Response<ICreateUserResponse>
  ) {
    const email = req.body?.email;
    const lastName = req.body?.lastName;
    const firstName = req.body?.firstName;
    const username = req.body?.username;

    console.log(req);
    console.log(req.body);

    if (!email || !lastName || !firstName || !username) {
      return res.status(HttpStatusCode.BAD_REQUEST).send(validationError());
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          {
            username,
          },
          {
            email,
          },
        ],
      },
    });

    console.log(user);

    if (user?.username == username) {
      return res
        .status(HttpStatusCode.CONFLICT)
        .send(usernameAlreadyTakenException());
    }

    if (user?.email == email) {
      return res
        .status(HttpStatusCode.CONFLICT)
        .send(emailAlreadyInUseException());
    }

    const newUser: User = await prisma.user.create({
      data: {
        email,
        lastName,
        firstName,
        username,
        password: randomUUID(),
      },
    });

    res.status(HttpStatusCode.CREATED).send({
      data: {
        id: newUser.id,
        email: newUser.email,
        lastName: newUser.lastName,
        firstName: newUser.firstName,
        username: newUser.username,
      },
      success: true,
      error: undefined,
    });
  }

  static async editUser(req: Request, res: Response) {
    res.send("create user");
  }

  static async getUser(req: Request, res: Response) {
    res.send("update user");
  }
}
