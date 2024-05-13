
import express, { Request, Response } from 'express';
import { database, prisma } from './shared/database/';
import cors from 'cors';
import { UsersService } from './modules';

const app = express();
app.use(express.json());
app.use(cors())

export const Errors = {
  UsernameAlreadyTaken: 'UsernameAlreadyTaken',
  EmailAlreadyInUse: 'EmailAlreadyInUse',
  ValidationError: 'ValidationError',
  ServerError: 'ServerError',
  ClientError: 'ClientError',
  UserNotFound: 'UserNotFound'
}

function isMissingKeys (data: any, keysToCheckFor: string[]) {
  for (const key of keysToCheckFor) {
    if (data[key] === undefined) return true;
  } 
  return false;
}


function parseUserForResponse (user: any) {
  const returnData = JSON.parse(JSON.stringify(user));
  delete returnData.password;
  return returnData;
}


const usersService = new UsersService(database);


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
    
    try {
      const user = await usersService.createUser(userData);
      return res.status(201).json({ error: undefined, data: parseUserForResponse(user), success: true });

    } catch (error: any) {
      if (error.message === Errors.EmailAlreadyInUse) {
        return res.status(409).json({ error: Errors.EmailAlreadyInUse, data: undefined, success: false });
      }
      if (error.message === Errors.UsernameAlreadyTaken) {

        return res.status(409).json({ error: Errors.UsernameAlreadyTaken, data: undefined, success: false });
      }

      return res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
    }
    
  } catch (error) {
    return res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
  }
});

// Edit a user
app.post('/users/edit/:userId', async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.userId);

    const keyIsMissing = isMissingKeys(req.body, 
      ['email', 'firstName', 'lastName', 'username']
    );

    if (keyIsMissing) {
      return res.status(400).json({ error: Errors.ValidationError, data: undefined, success: false })
    }

    // Get user by id
    const userToUpdate = await prisma.user.findFirst({ where: { id }});
    if (!userToUpdate) {
      return res.status(404).json({ error: Errors.UserNotFound, data: undefined, success: false })
    }

    // If target username already taken by another user
    const existingUserByUsername = await prisma.user.findFirst({ where: { username: userToUpdate.username }})
    if (existingUserByUsername && userToUpdate.id !== existingUserByUsername.id) {
      return res.status(409).json({ error: Errors.UsernameAlreadyTaken, data: undefined, success: false })
    }
    
    // If target email already exists from another user
    const existingUserByEmail = await prisma.user.findFirst({ where: { email: userToUpdate.email }})
    if (existingUserByEmail && userToUpdate.id !== existingUserByEmail?.id) {
      return res.status(409).json({ error: Errors.EmailAlreadyInUse, data: undefined, success: false })
    }

    const userData = req.body;
    const user = await prisma.user.update({ where: { id }, data: userData });
    return res.status(200).json({ error: undefined, data: parseUserForResponse(user), success: true });
  } catch (error) {
    return res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
  }
});

// Get a user by email
app.get('/users', async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;
    if (email === undefined) {
      return res.status(400).json({ error: Errors.ValidationError, data: undefined, success: false })
    }
    
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: Errors.UserNotFound, data: undefined, success: false })
    }

    return res.status(200).json({ error: undefined, data: parseUserForResponse(user), succes: true });
  } catch (error) {
    return res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
  }
});

// Get posts
app.get('/posts', async (req: Request, res: Response) => {
  try {
    const { sort } = req.query;
    
    if (sort !== 'recent') {
      return res.status(400).json({ error: Errors.ClientError, data: undefined, success: false })
    } 

    const postsWithVotes = await prisma.post.findMany({
      include: {
        votes: true, // Include associated votes for each post
        memberPostedBy: {
          include: {
            user: true
          }
        },
        comments: true
      },
      orderBy: {
        dateCreated: 'desc', // Sorts by dateCreated in descending order
      },
    });

    return res.json({ error: undefined, data: { posts: postsWithVotes }, success: true });
  } catch (error) {
    return res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
  }
});

const port = process.env.PORT || 3000;

if(process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}



export { app }