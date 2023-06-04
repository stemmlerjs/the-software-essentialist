
import { CreateUserCommand, EditUserCommand, GetUserByEmailQuery } from "@dddforum/shared/src/api/users";
import { PrismaClient, User } from "@prisma/client";
import { Errors } from "../../shared/errors/errors";
import { EmailService } from "../email/emailService";
import { DBConnection } from "../../shared/database/database";

function isMissingKeys (data: any, keysToCheckFor: string[]) {
  for (let key of keysToCheckFor) {
    if (data[key] === undefined) return true;
  } 
  return false;
}

function generateRandomPassword(length: number): string {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
  const passwordArray = [];

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    passwordArray.push(charset[randomIndex]);
  }

  return passwordArray.join('');
}

function parseUserForResponse (user: User) {
  const returnData = JSON.parse(JSON.stringify(user));
  delete returnData.password;
  return returnData;
}

export class UserService {

  constructor (private db: DBConnection, private emailService: EmailService) {
    
  }

  async createUser (input: CreateUserCommand) {
    const dbConnection = this.db.getConnection()
    try {
      const keyIsMissing = isMissingKeys(input, 
        ['email', 'firstName', 'lastName', 'username']
      );
      
      if (keyIsMissing) {
        return { error: Errors.ValidationError, data: undefined, success: false }
      }
  
      const isEmailValid = input.email.indexOf('@') !== -1;
      const isFirstNameValid = input.firstName.length > 2 && input.firstName.length < 16;
      const isLastNameValid = input.lastName.length > 2 && input.lastName.length < 25;
      const isUsernameValid = input.username.length > 2 && input.firstName.length < 25;
  
      if (!isEmailValid || !isFirstNameValid || !isLastNameValid || !isUsernameValid) {
        return { error: Errors.ValidationError, data: undefined, success: false }
      }
  
      const userData = input;
      const existingUserByEmail = await dbConnection.user.findFirst({ where: { email: input.email }});

      if (existingUserByEmail) {
        return { error: Errors.EmailAlreadyInUse, data: undefined, success: false };
      }
  
      const existingUserByUsername = await dbConnection.user.findFirst({ where: { username: input.username as string }});
      if (existingUserByUsername) {
        return { error: Errors.UsernameAlreadyTaken, data: undefined, success: false };
      }
  
      const user = await dbConnection.user.create({
        data: {
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          username: userData.username,
          password: generateRandomPassword(10)
        }
      });
      
      await this.emailService.sendMail({ 
        to: user.email, 
        subject: 'Your login details to DDDForum', 
        text: `Welcome to DDDForum. You can login with the following details </br>
        email: ${user.email}
        password: ${user.password}`
      });
  
      return { error: undefined, data: parseUserForResponse(user), success: true }
    } catch (err) {
      console.log(err);
      return { error: Errors.ServerError, data: undefined, success: false }
    }
  }

  async editUser (editUserCommand: EditUserCommand) {
    const dbConnection = this.db.getConnection()
    try {
      let id = Number(editUserCommand.id);
  
      const keyIsMissing = isMissingKeys(editUserCommand, 
        ['email', 'firstName', 'lastName', 'username']
      );
  
      if (keyIsMissing) {
        return { error: Errors.ValidationError, data: undefined, success: false };
      }
  
      // Get user by id
      const userToUpdate = await dbConnection.user.findFirst({ where: { id }});
      if (!userToUpdate) {
        return { error: Errors.UserNotFound, data: undefined, success: false };
      }
  
      // If target username already taken by another user
      const existingUserByUsername = await dbConnection.user.findFirst({ where: { username: userToUpdate.username }})
      if (existingUserByUsername && userToUpdate.id !== existingUserByUsername.id) {
        return { error: Errors.UsernameAlreadyTaken, data: undefined, success: false };
      }
      
      // If target email already exists from another user
      const existingUserByEmail = await dbConnection.user.findFirst({ where: { email: userToUpdate.email }})
      if (existingUserByEmail && userToUpdate.id !== existingUserByEmail?.id) {
        return { error: Errors.EmailAlreadyInUse, data: undefined, success: false };
      }
  
      const userData: any = editUserCommand;
      delete userData.id;

      const user = await dbConnection.user.update({ where: { id }, data: userData });
      return { error: undefined, data: parseUserForResponse(user), success: true };
    } catch (error) {
      return { error: Errors.ServerError, data: undefined, success: false };
    }
  }

  async getUserByEmail (query: GetUserByEmailQuery) {
    const dbConnection = this.db.getConnection()
    try {
      const email = query.email as string;
      if (email === undefined) {
        return { error: Errors.ValidationError, data: undefined, success: false };
      }
      
      const user = await dbConnection.user.findUnique({ where: { email } });
      if (!user) {
        return { error: Errors.UserNotFound, data: undefined, success: false }; 
      }

      return { error: undefined, data: parseUserForResponse(user), succes: true };

    } catch (error) {
      return { error: Errors.ServerError, data: undefined, success: false };
    }
  }

  async deleteUser (email: string) {
    const dbConnection = this.db.getConnection()
    try {
      await dbConnection.user.delete({ where: { email: email }})
    } catch (err) {
      return 
    }
  }
}