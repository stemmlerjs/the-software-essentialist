import express, { Request, Response } from "express";
import { ICreateUserRequest } from "./CreateUser/ICreateUserRequest";

export class UserController {
  constructor() {}

  static async createUser(
    req: Request<{}, {}, ICreateUserRequest>,
    res: Response
  ) {
    res.send("get user");
  }

  static async editUser(req, res) {
    res.send("create user");
  }

  static async getUserByEmail(req, res) {
    res.send("update user");
  }
}
