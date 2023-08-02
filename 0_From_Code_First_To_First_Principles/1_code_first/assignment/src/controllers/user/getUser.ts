import { Request, Response } from 'express';
import Joi from 'joi';
import { PrismaClient} from '@prisma/client';

const userClient = new PrismaClient().user;

export const getUser = async (req: Request, res: Response) => {
  if (!req.query?.email) {
    return res.status(404).json({ error: 'UserNotFound', data: undefined, success: false });
  }
  const { email } = req.query;
  if (typeof(email) !== 'string') {
    return res.status(404).json({ error: 'UserNotFound', data: undefined, success: false });
  }

  try {
    const user = await userClient.findFirst({
      where: { email }
    });
    if (!user) {
      return res.status(404).json({ error: 'UserNotFound', data: undefined, success: false });
    }
    const { id, username, firstName, lastName } = user;
    res.status(200).json({ error: undefined, data: { id, email, username, firstName, lastName }, success: true } )
  } catch (err) {
    console.log(err);
  }
}