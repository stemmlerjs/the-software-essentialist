
import express, { Request, Response } from 'express';
import { prisma } from './database';
import { User } from '@prisma/client';
const cors = require('cors')
const app = express();
app.use(express.json());
app.use(cors())

const Errors = {
  UsernameAlreadyTaken: 'UserNameAlreadyTaken',
  EmailAlreadyInUse: 'EmailAlreadyInUse',
  ValidationError: 'ValidationError',
  ServerError: 'ServerError',
  ClientError: 'ClientError',
  UserNotFound: 'UserNotFound'
}

function isMissingKeys (data: any, keysToCheckFor: string[]) {
  for (let key of keysToCheckFor) {
    if (data[key] === undefined) return true;
  } 
  return false;
}

function generateRandomPassword(length: number): string {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
  const passwordArray = [];

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    passwordArray.push(charset[randomIndex]);
  }

  return passwordArray.join('');
}

function parseUserForResponse (user: User) {
  const returnData = JSON.parse(JSON.stringify(user));
  delete returnData.password;
  return returnData;
}

// Create a new user
app.post('/users/new', async (req: Request, res: Response) => {
  try {
    const keyIsMissing = isMissingKeys(req.body, 
      ['email', 'firstName', 'lastName', 'username']
    );
    
    if (keyIsMissing) {
      return res.status(400).json({ error: Errors.ValidationError, data: undefined, success: false })
    }

    const userData = req.body;
    
    const existingUserByEmail = await prisma.user.findFirst({ where: { email: req.body.email }});
    if (existingUserByEmail) {
      return res.status(409).json({ error: Errors.EmailAlreadyInUse, data: undefined, success: false })
    }

    const existingUserByUsername = await prisma.user.findFirst({ where: { username: req.body.username as string }});
    if (existingUserByUsername) {
      return res.status(409).json({ error: Errors.UsernameAlreadyTaken, data: undefined, success: false })
    }

    const { user, member } = await prisma.$transaction(async (tx) => {
      const user = await prisma.user.create({ data: { ...userData, password: generateRandomPassword(10) } });
      const member = await prisma.member.create({ data: { userId: user.id }})
      return { user, member }
    })
    
    return res.status(201).json({ error: undefined, data: parseUserForResponse(user), success: true });
  } catch (error) {
    console.log(error)
    // Return a failure error response
    return res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
  }
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


prisma.post.findMany({})
  .then((posts) => console.log(posts))
  .catch((err) => console.log(err));