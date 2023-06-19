
import express, { Request, Response } from 'express';
import sequelize from './sequelize';
import { User } from './models/user';

const app = express();
const port = 3000;

app.use(express.json());

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('API is running!');
});

app.post('/users', async (req: Request, res: Response) => {
  const { name, email } = req.body;

  try {
    const user = await User.create({ name, email });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

app.put('/users/:id', async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { name, email } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (user) {
      user.name = name;
      user.email = email;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

app.get('/users/:email', async (req: Request, res: Response) => {
  const email = req.params.email;

  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
});

// Sync the Sequelize models with the database
sequelize.sync().then(() => {
  // Start the server
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
});