import express, { Request, Response } from 'express';
import { createUser, editUser, getUserByEmail } from './modules/users/userController';
import { ApplicationError, CreateUserSuccess } from './modules/users/userDTOs';

const app = express();
app.use(express.json());

// Create a new user
app.post('/users/new', async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json({
      success: true, 
      data: user,
    } as CreateUserSuccess);
    return 
  } catch (error) {
    
    res.status(500).json({ success: false, error } as ApplicationError);
  }
});

// Edit a user
app.post('/users/edit/:userId', async (req: Request, res: Response) => {
  try {
    const user = await editUser(Number(req.params.userId), req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ success: false, error } as ApplicationError);
  }
});

// Get a user by email
app.get('/users', async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;
    const user = await getUserByEmail(email);
    res.json(user);
  } catch (error) {
    res.status(500).json({ success: false, error } as ApplicationError);
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
