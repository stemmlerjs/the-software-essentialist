import express from 'express';
import { PrismaClient } from '@prisma/client';

import { createUser, editUser, getUser } from './controllers';

const prisma = new PrismaClient();
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.post('/users/new', createUser);
app.post('/users/edit/:userId', editUser);
app.get('/users', getUser);

// Démarrez le serveur.
app.listen(port, () => {
  console.log('Server is running on port 3000');
});
