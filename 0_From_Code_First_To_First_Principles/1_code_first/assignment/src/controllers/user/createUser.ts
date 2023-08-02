import { Request, Response } from 'express';
import Joi from 'joi';
import { PrismaClient} from '@prisma/client';
import crypto from 'crypto';

const userClient = new PrismaClient().user;

export const createUser = async (req: Request, res: Response) => {

  const userSchema = Joi.object({
    username: Joi.string().required().min(3).max(255),
    firstName: Joi.string().required().min(3).max(255),
    lastName: Joi.string().required().min(3).max(255),
    email: Joi.string().required().email(),
  });

  const errors = userSchema.validate(req.body);
  if (errors.error) {
    return res.status(400).json({ error: 'ValidationError', data: undefined, success: false })
  }
  const { username, email, firstName, lastName } = req.body;

  try {

    const checkUsername = await userClient.findFirst({
      where: { username }
    });
    if (checkUsername) {
      return res.status(409).json({ error: 'UsernameAlreadyTaken', data: undefined, success: false });
    }

    const checkEmail = await userClient.findFirst({
      where: { email }
    });
    if (checkEmail) {
      return res.status(409).json({ error: 'EmailAlreadyInUse', data: undefined, success: false })
    }

    const user = await userClient.create({
      data: {
        firstName,
        lastName,
        username,
        email,
        password: crypto.randomBytes(10).toString('hex'),
      }
    });
    // Return the new user to the client.
    res.status(201).json({ error: undefined, data: { id: user.id, email, username, firstName, lastName }, success: true });
  } catch(err) {
    console.log(err);
  }
}