import express, { Request, Response } from 'express';
import cors from 'cors';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();

app.use(express.json());
app.use(cors());

// Create a new user
app.post('/users/new', async (req: Request, res: Response) => {
  const user = await prisma.user.create({ data: req.body });

  res.json(user);
});

// Edit a user
app.post('/users/edit/:userId', async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);

  const user = await prisma.user.update({
    where: { id: userId },
    data: req.body,
  });

  res.json(user);
});

// Get a user by email
app.get('/users', async (req: Request, res: Response) => {
  const email = req.query.email;

  if (typeof email !== 'string') {
    return res.status(400).json({ message: 'Invalid email' });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  res.json(user);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
