import { Request, Response } from 'express';
import Joi from 'joi';
import { PrismaClient} from '@prisma/client';

const userClient = new PrismaClient().user;

export const editUser = async (req: Request, res: Response) => {
  if (!req.params?.userId) {
    return res.status(404).json({ error: 'UserNotFound', data: undefined, success: false });
  }
  const { userId } = req.params;
  const uid = parseInt(userId);
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
    where: { username, NOT: { id: uid } }
  });
  if (checkUsername) {
    return res.status(409).json({ error: 'UsernameAlreadyTaken', data: undefined, success: false });
  }

  const checkEmail = await userClient.findFirst({
    where: { email, NOT: { id: uid } }
  });
  if (checkEmail) {
    return res.status(409).json({ error: 'EmailAlreadyInUse', data: undefined, success: false })
  }

  const user = await userClient.findFirst({
    where: { id: uid }
  });
  if (!user) {
    return res.status(404).json({ error: 'UserNotFound', data: undefined, success: false });
  }

  console.log('me user:', user);

  const updatedUser = await userClient.update({
    where: { id: user.id },
    data: {
      firstName,
      lastName,
      username,
      email,
    }
  });

  res.status(200).json({ error: undefined, data: { id: updatedUser.id, email, username, firstName, lastName }, success: true });

  } catch(err) {
    console.log(err);
  }

}