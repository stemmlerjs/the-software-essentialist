
import { CreateUserCommand, EditUserCommand, GetUserByEmailQuery } from "@dddforum/shared/src/api/users";
import { Errors } from "../../shared/errors/errors";
import { Database } from "../../shared/database/database";
import { TextUtil } from "@dddforum/shared/src/utils/textUtil";
import { TransactionEmailAPI } from "../marketing/ports/transactionalEmailAPI";

function isMissingKeys (data: any, keysToCheckFor: string[]) {
  for (let key of keysToCheckFor) {
    if (data[key] === undefined) return true;
  } 
  return false;
}

export class UserService {

  constructor (private db: Database, private emailAPI: TransactionEmailAPI) {
    
  }

  async createUser (input: CreateUserCommand) {
    try {
      const keyIsMissing = isMissingKeys(input, 
        ['email', 'firstName', 'lastName', 'username']
      );
      
      if (keyIsMissing) {
        return { error: Errors.ValidationError, data: undefined, success: false }
      }
  
      const isEmailValid = input.email.indexOf('@') !== -1;
      const isFirstNameValid = TextUtil.isBetweenLength(input.firstName, 2, 16);
      const isLastNameValid = TextUtil.isBetweenLength(input.lastName, 2, 25);
      const isUsernameValid = TextUtil.isBetweenLength(input.username, 2, 25); 
  
      if (!isEmailValid || !isFirstNameValid || !isLastNameValid || !isUsernameValid) {
        return { error: Errors.ValidationError, data: undefined, success: false }
      }
  
      const userData = input;
      const existingUserByEmail = await this.db.users.getUserByEmail(input.email);

      if (existingUserByEmail) {
        return { error: Errors.EmailAlreadyInUse, data: undefined, success: false };
      }
  
      const existingUserByUsername = await this.db.users.getUserByUsername(input.username);
      if (existingUserByUsername) {
        return { error: Errors.UsernameAlreadyTaken, data: undefined, success: false };
      }

      const pass = TextUtil.createRandomText(10);
      
      const userDTO = await this.db.users.save({
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        username: userData.username,
        password: pass,
      });
      
      await this.emailAPI.sendMail({ 
        to: input.email, 
        subject: 'Your login details to DDDForum', 
        text: `Welcome to DDDForum. You can login with the following details </br>
        email: ${input.email}
        password: ${pass}`
      });
  
      return { error: undefined, data: userDTO, success: true }
    } catch (err) {
      console.log(err);
      return { error: Errors.ServerError, data: undefined, success: false }
    }
  }

  async editUser (editUserCommand: EditUserCommand) {
    try {
      let id = Number(editUserCommand.id);
  
      const keyIsMissing = isMissingKeys(editUserCommand, 
        ['email', 'firstName', 'lastName', 'username']
      );
  
      if (keyIsMissing) {
        return { error: Errors.ValidationError, data: undefined, success: false };
      }
  
      // Get user by id
      const userToUpdate = await this.db.users.findById(id);
      if (!userToUpdate) {
        return { error: Errors.UserNotFound, data: undefined, success: false };
      }
  
      // If target username already taken by another user
      const existingUserByUsername = await this.db.users.getUserByUsername(userToUpdate.username)
      
      if (existingUserByUsername && userToUpdate.id !== existingUserByUsername.id) {
        return { error: Errors.UsernameAlreadyTaken, data: undefined, success: false };
      }
      
      // If target email already exists from another user
      const existingUserByEmail = await this.db.users.getUserByEmail(userToUpdate.email)
      if (existingUserByEmail && userToUpdate.id !== existingUserByEmail?.id) {
        return { error: Errors.EmailAlreadyInUse, data: undefined, success: false };
      }
  
      const userData: any = editUserCommand;
      delete userData.id;

      const user = this.db.users.update(id, userData);
      return { error: undefined, data: user, success: true };
    } catch (error) {
      return { error: Errors.ServerError, data: undefined, success: false };
    }
  }

  async getUserByEmail (query: GetUserByEmailQuery) {
    try {
      const email = query.email as string;
      if (email === undefined) {
        return { error: Errors.ValidationError, data: undefined, success: false };
      }
      
      const user = await this.db.users.getUserByEmail(email);
      if (!user) {
        return { error: Errors.UserNotFound, data: undefined, success: false }; 
      }

      return { error: undefined, data: user, succes: true };

    } catch (error) {
      return { error: Errors.ServerError, data: undefined, success: false };
    }
  }

  async deleteUser (email: string) {
    try {
      await this.db.users.delete(email);
    } catch (err) {
      return 
    }
  }
}

