
import { User } from "../../../../domain/user";
import { UserRepo } from "../../userRepo";
import {UserModel} from "./userModel";

export class SequelizeUserRepo implements UserRepo {
  async setupDatabase() {
    // Sequelize automatically creates tables based on defined models
    await UserModel.sync();
  }

  async getAllUsers() {
    const users = await UserModel.findAll();
    return users.map((u) => User.fromSequelizeUser(u));
  }

  async getUserByEmail(email: string) {
    const user = await UserModel.findOne({ where: { email } });
    if (!user) return null;
    return User.fromSequelizeUser(user);
  }

  async getById(id: string) {
    let users = await this.getAllUsers();
    const user = await UserModel.findOne({where: { id }});
    if (!user) return null;
    return User.fromSequelizeUser(user)
  }

  async save(user: User) {
    try {
      await UserModel.create({
        id: user.getId(),
        email: user.getEmail(),
        firstName: user.getFirstName(),
        lastName: user.getLastName(),
      });
    } catch (err) {
      console.error(err);
    }
  }
}