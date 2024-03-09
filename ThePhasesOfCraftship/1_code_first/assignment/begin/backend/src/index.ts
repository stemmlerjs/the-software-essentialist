import express, { Request, Response } from 'express';
import cors from 'cors';
import { prisma } from './prisma';
import { User } from '@prisma/client';

const app = express();
app.use(express.json());
app.use(cors());

enum Errors {
  UsernameAlreadyTaken = 'UserNameAlreadyTaken',
  EmailAlreadyInUse = 'EmailAlreadyInUse',
  ValidationError = 'ValidationError',
  ServerError = 'ServerError',
  ClientError = 'ClientError',
  UserNotFound = 'UserNotFound',
}

function generateRandomPassword(length: number): string {
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
  const passwordArray: string[] = [];

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    passwordArray.push(charset[randomIndex]);
  }

  return passwordArray.join('');
}

function parseUserForResponse(user: User) {
  const returnData = JSON.parse(JSON.stringify(user));
  delete returnData.password;
  return returnData;
}

function validateUser(data: any): data is User {
  return (
    'email' in data &&
    'username' in data &&
    'firstName' in data &&
    'lastName' in data
  );
}

app.get('/posts', async (req: Request, res: Response) => {
  try {
    const { sort } = req.query;

    if (sort !== 'recent') {
      return res.status(400).json({
        error: Errors.ClientError,
        data: undefined,
        success: false,
      });
    }

    const postsWithVotes = await prisma.post.findMany({
      include: {
        votes: true,
        memberPostedBy: {
          include: {
            user: true,
          },
        },
        comments: true,
      },
      orderBy: {
        dateCreated: 'desc',
      },
    });

    return res.status(200).json({
      error: undefined,
      data: { posts: postsWithVotes },
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      error: Errors.ServerError,
      data: undefined,
      success: false,
    });
  }
});

app.post('/users/new', async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    const isValidBody = validateUser(userData);

    if (!isValidBody) {
      return res.status(400).json({
        error: Errors.ValidationError,
        data: undefined,
        success: false,
      });
    }

    const optionalUserByUsername = await prisma.user.findFirst({
      where: { username: req.body.username },
    });

    if (optionalUserByUsername) {
      return res.status(409).json({
        error: Errors.UsernameAlreadyTaken,
        data: undefined,
        success: false,
      });
    }

    const optionalUserByEmail = await prisma.user.findFirst({
      where: { email: req.body.email },
    });

    if (optionalUserByEmail) {
      return res.status(409).json({
        error: Errors.EmailAlreadyInUse,
        data: undefined,
        success: false,
      });
    }

    const user = await prisma.user.create({
      data: { ...userData, password: generateRandomPassword(10) },
    });

    return res.status(201).json({
      error: undefined,
      data: parseUserForResponse(user),
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      error: Errors.ClientError,
      data: undefined,
      success: false,
    });
  }
});

app.put('/users/edit/:userId', async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    const isValidBody = validateUser(userData);

    if (!isValidBody) {
      return res.status(400).json({
        error: Errors.ValidationError,
        data: undefined,
        success: false,
      });
    }

    const userId = parseInt(req.params.userId);

    const optionalUserById = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (!optionalUserById) {
      return res.status(404).json({
        error: Errors.UserNotFound,
        data: undefined,
        success: false,
      });
    }

    const optionalUserByUsername = await prisma.user.findFirst({
      where: { username: req.body.username },
    });

    if (optionalUserByUsername) {
      return res.status(409).json({
        error: Errors.UsernameAlreadyTaken,
        data: undefined,
        success: false,
      });
    }

    const optionalUserByEmail = await prisma.user.findFirst({
      where: { email: req.body.email },
    });

    if (optionalUserByEmail) {
      return res.status(409).json({
        error: Errors.EmailAlreadyInUse,
        data: undefined,
        success: false,
      });
    }

    const user = await prisma.user.update({
      data: userData,
      where: {
        id: userId,
      },
    });

    return res.status(200).json({
      error: undefined,
      data: parseUserForResponse(user),
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      error: Errors.ClientError,
      data: undefined,
      success: false,
    });
  }
});

app.get('/users', async (req: Request, res: Response) => {
  try {
    const optionalUserByEmail = await prisma.user.findFirst({
      where: { email: req.query.email!.toString() },
    });

    if (!optionalUserByEmail) {
      return res.status(404).json({
        error: Errors.UserNotFound,
        data: undefined,
        success: false,
      });
    }

    return res.status(200).json({
      error: undefined,
      data: parseUserForResponse(optionalUserByEmail),
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      error: Errors.ClientError,
      data: undefined,
      success: false,
    });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
