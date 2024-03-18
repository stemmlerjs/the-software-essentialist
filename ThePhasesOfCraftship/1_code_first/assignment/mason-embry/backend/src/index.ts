import cors from 'cors';
import express, { Request, Response } from 'express';

import { db } from './database/db';
import {
  ErrorMessage,
  ResponseDTO,
} from './iDontKnowWhereToPutThis/responseDTO';

const app = express();

app.use(express.json());
app.use(cors());

// Create a new user
app.post('/users/new', async (req: Request, res: Response) => {
  try {
    const isValid =
      req.body.username &&
      req.body.email &&
      req.body.firstName &&
      req.body.lastName;

    if (!isValid) {
      const responseDTO = new ResponseDTO(ErrorMessage.ValidationError, null);
      res.status(400).json(responseDTO);
      return;
    }

    const userWithExistingUsername = await db.user.findUnique({
      where: {
        username: req.body.username,
      },
    });

    if (userWithExistingUsername) {
      const responseDTO = new ResponseDTO(
        ErrorMessage.UsernameAlreadyTaken,
        null
      );
      res.status(409).json(responseDTO);
      return;
    }

    const userWithExistingEmail = await db.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (userWithExistingEmail) {
      const responseDTO = new ResponseDTO(ErrorMessage.EmailAlreadyInUse, null);
      res.status(409).json(responseDTO);
      return;
    }

    const newUser = await db.user.create({ data: req.body });

    const responseDTO = new ResponseDTO(null, {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
    });

    res.status(201).json(responseDTO);
  } catch (err) {
    console.error(err);
    const responseDTO = new ResponseDTO(ErrorMessage.ServerError, null);
    res.status(500).json(responseDTO);
  }
});

// Edit a user
app.post('/users/edit/:userId', async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);

    const isValid =
      req.body.username &&
      req.body.email &&
      req.body.firstName &&
      req.body.lastName;

    if (!isValid) {
      const responseDTO = new ResponseDTO(ErrorMessage.ValidationError, null);
      res.status(400).json(responseDTO);
      return;
    }

    const usersAlreadyUsingThisUsername = await db.user.findFirst({
      where: {
        username: req.body.username,
        NOT: {
          id: userId,
        },
      },
    });

    if (usersAlreadyUsingThisUsername) {
      const responseDTO = new ResponseDTO(
        ErrorMessage.UsernameAlreadyTaken,
        null
      );
      res.status(409).json(responseDTO);
      return;
    }

    const usersAlreadyUsingThisEmail = await db.user.findFirst({
      where: {
        email: req.body.email,
        NOT: {
          id: userId,
        },
      },
    });

    if (usersAlreadyUsingThisEmail) {
      const responseDTO = new ResponseDTO(ErrorMessage.EmailAlreadyInUse, null);
      res.status(409).json(responseDTO);
      return;
    }

    const user = await db.user.update({
      where: { id: userId },
      data: req.body,
    });

    if (!user) {
      const responseDTO = new ResponseDTO(ErrorMessage.UserNotFound, null);
      res.status(404).json(responseDTO);
      return;
    }

    const responseDTO = new ResponseDTO(null, {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    });

    res.status(201).json(responseDTO);
  } catch (err) {
    console.error(err);
    const responseDTO = new ResponseDTO(ErrorMessage.ServerError, null);
    res.status(500).json(responseDTO);
  }
});

// Get a user by email
app.get('/users', async (req: Request, res: Response) => {
  try {
    const email = req.query.email;

    const isValid = typeof email === 'string';

    if (!isValid) {
      const responseDTO = new ResponseDTO(ErrorMessage.ValidationError, null);
      res.status(400).json(responseDTO);
      return;
    }

    const user = await db.user.findUnique({ where: { email } });

    if (!user) {
      const responseDTO = new ResponseDTO(ErrorMessage.UserNotFound, null);
      res.status(404).json(responseDTO);
      return;
    }

    const responseDTO = new ResponseDTO(null, {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    });

    res.status(201).json(responseDTO);
  } catch (err) {
    console.error(err);
    const responseDTO = new ResponseDTO(ErrorMessage.ServerError, null);
    res.status(500).json(responseDTO);
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
