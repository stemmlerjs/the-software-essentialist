
import express, { Request, Response } from 'express';
import { getRecentPosts } from './posts';
import cors from 'cors'
import { createUser, editUser, getUserByEmail, userExists } from './users';
const app = express();
app.use(express.json());
app.use(cors())

// Create a new user
app.post('/users/new', async (req: Request, res: Response) => {
  try {
    if (!areInputsValid(req.body)){
        res.status(400).json({
            error: ERROR_VALIDATION,
            data: undefined,
            success: false,
          });
    }

    const { email, username, firstName, lastName } = req.body;
    const response = await createUser({ email, username, firstName, lastName });

    if (response?.error === ERROR_EMAIL_TAKEN) {
        res.status(409).json(response);
    }

    if (response?.error === ERROR_USERNAME_TAKEN) {
        res.status(409).json(response);
    }

    res.status(201).json(response);
} catch (error) {
  console.error('Error inserting user data:', error);
}
});

// Edit a user
app.post('/users/edit/:userId', async (req: Request, res: Response) => {
  try {
    if (!areInputsValid(req.body)){
      res.status(400).json({
        error: ERROR_VALIDATION,
        data: undefined,
        success: false,
      });
    }

    const userId = req.params.userId;

    if (userId && await userExists(userId)) {

      const response = await editUser(Number(req.params.userId), req.body)

      if (response?.error === ERROR_USERNAME_TAKEN) {
          res.status(409).json(response);
      }

      if (response?.error === ERROR_EMAIL_TAKEN) {
        res.status(409).json(response);
      }

      res.status(200).json(response);
    } else {
        res.status(404).json({ 
            error: ERROR_USER_NOT_FOUND,
            data: undefined, 
            success: false 
        })
    }
  } catch (error) {
    console.error('Error updating user data:', error);
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
