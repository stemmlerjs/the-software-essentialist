import express, { Request, Response } from 'express';
import { prisma } from './database';
import cors from 'cors';
import { generateRandomPassword, parseUserForResponse } from './password.helper';

export interface UserData {
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    password: string;
}

export const Errors = {
    UsernameAlreadyTaken: 'UserNameAlreadyTaken',
    EmailAlreadyInUse: 'EmailAlreadyInUse',
    ValidationError: 'ValidationError',
    ServerError: 'ServerError',
    ClientError: 'ClientError',
    UserNotFound: 'UserNotFound'
  }


const app = express();
app.use(express.json());
app.use(cors());

app.post('/users/new', async (req: Request, res: Response): Promise<void> => {
    const userData: UserData = req.body;
    try {

        // Check for existing email or username
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: userData.email },
                    { username: userData.username },
                ],
            },
        });
        if (existingUser) {
            if (existingUser.email === userData.email) {
                res.status(409).json({
                    error: Errors.EmailAlreadyInUse,
                    data: undefined,
                    success: false,
                });
                return;
            }
            if (existingUser.username === userData.username) {
                 res.status(409).json({
                    error: Errors.UsernameAlreadyTaken,
                    data: undefined,
                    success: false,
                });
                return;
            }
        }

        // validation
        const requiredFields = ['email', 'username', 'firstName', 'lastName'];
        const missingFields = requiredFields.filter(field => !userData[field as keyof UserData]);
        if (missingFields.length > 0) {
            res.status(400).json({ 
                error: Errors.ValidationError,
                data: undefined,
                success: false
            })
            return;
        }

        // save to database
        const newUser = await prisma.user.create({
            data: {
                ...userData,
                password: generateRandomPassword(10),               
            },
        });
        // send response without password
        const userInfoWithoutPassword = parseUserForResponse(newUser);
        res.status(201).json({message: 'User created', data: userInfoWithoutPassword});

    } catch(error) {
        const err = error as Error;
        res.status(500).json({
            error: Errors.ValidationError,
            data: err,
            success: false,
        });
    }
});

app.post('/users/edit/:userId', async (req: Request, res: Response): Promise<void> => {
    const { email, username, firstName, lastName } = req.body;
    const userId = +req.params.userId;

    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                id: userId
            },
        });
        // user not found
        if(!existingUser) {
            res.status(404).json({ 
                error: Errors.UserNotFound,
                data: undefined,
                success: false
            });
            return;
        }

          // validate non-null fields
          if (!email || !username || !firstName || !lastName) {
            res.status(400).json({
                error: Errors.ValidationError,
                data: undefined,
                success: false,
            });
            return;
        }

        const usernameConflict = await prisma.user.findFirst({
            where: {
                username,
                id: { not: userId },
            },
        });

        if (usernameConflict) {
            res.status(409).json({
                error: Errors.UsernameAlreadyTaken,
                data: undefined,
                success: false,
            });
            return;
        }

        const emailConflict = await prisma.user.findFirst({
            where: {
                email,
                id: { not: userId }, // Exclude the current user
            },
        });
        if (emailConflict) {
            res.status(409).json({
                error: Errors.EmailAlreadyInUse,
                data: undefined,
                success: false,
            });
            return;
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { email, username, firstName, lastName },
        });

        res.status(200).json({
            error: undefined,
            data: {
                id: updatedUser.id,
                email: updatedUser.email,
                username: updatedUser.username,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
            },
            success: true,
        });

    } catch(error) {
        const err = error as Error;
        res.status(500).json({
            error: Errors.ValidationError,
            data: err,
            success: false,
        });
    }
});

app.get('/users', async (req: Request, res: Response): Promise<void> => {
    const email = req.query.email;

    try {
        const user = await prisma.user.findUnique({
            where: { email: typeof email === 'string'? email : undefined }, // Match email from query param
        });
    
        if (!user) {
            res.status(404).json({
                error: Errors.UserNotFound,
                data: undefined,
                success: false,
            });
            return;
        }
        res.status(200).json({error: undefined, data: user});
    } catch(error) {
        const err = error as Error;
        res.status(500).json({
            error: Errors.ValidationError,
            data: error,
            success: false,
        });
    }
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Serer is running on port ${port}`);
});