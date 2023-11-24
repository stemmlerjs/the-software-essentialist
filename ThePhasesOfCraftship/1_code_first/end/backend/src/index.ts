import express, { Request, Response } from 'express';
import { createUser, editUser, getUserByEmail } from './controllers/userController';
import { getRecentPosts } from './controllers/postsController';

const app = express();
app.use(express.json());

// Create a new user
app.post('/users/new', async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user.' });
  }
});

// Edit a user
app.post('/users/edit/:userId', async (req: Request, res: Response) => {
  try {
    const user = await editUser(Number(req.params.userId), req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to edit user.' });
  }
});

// Get a user by email
app.get('/users', async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;
    const user = await getUserByEmail(email);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user.' });
  }
});

// Get a user by email
app.get('/posts', async (req: Request, res: Response) => {
  try {
    const { sort } = req.query;
    let posts;

    if (sort === 'recent') {
      posts = await getRecentPosts()
    } else {
      return res.status(500).json({ error: 'include ?sort= query'})
    }

    return res.json({ posts });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching posts' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
