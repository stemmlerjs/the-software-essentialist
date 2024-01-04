import { randomUUID } from "crypto";
import { UserModel } from "../repos/userRepo/implementations/sequelize/userModel";

interface UserProps {
  firstName: string;
  lastName: string;
  email: string;
}

export class User {

  private props: UserProps;
  private id: string;

  private constructor (props: UserProps, id?: string) {
    this.props = props;
    this.id = id ? id : randomUUID();
    console.log('created user with', this.id)
  }

  getId () {
    return this.id;
  }
  
  getFirstName (): string {
    return this.props.firstName;
  }

  getLastName (): string {
    return this.props.lastName;
  }

  getEmail (): string {
    return this.props.email;
  }
  
  public static fromJSON (userProps: UserProps, id: string) {
    return new User(userProps, id);
  }

  public static fromSequelizeUser (sequelizeUser: any) {
    console.log('reconstituting user from ', sequelizeUser)
    return new User({
      firstName: sequelizeUser.dataValues.firstName,
      lastName: sequelizeUser.dataValues.lastName,
      email: sequelizeUser.dataValues.email
    }, sequelizeUser.dataValues.id)
  }

  public static create (userProps: UserProps): User | null {
    // Validate properly
    // Use value objects to encapsualte validation logic
    // Return a result instead of a null
    return new User({
      ...userProps
    });
  }

}