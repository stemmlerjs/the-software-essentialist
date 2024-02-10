export interface UserProperties {
  id?: number;
  email: string;
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
}

export class User {
  constructor(readonly properties: UserProperties) {
    this.properties = properties;
  }

  get id(): number | undefined {
    return this.properties.id;
  }

  get email(): string {
    return this.properties.email;
  }

  get userName(): string {
    return this.properties.userName;
  }

  get password(): string {
    return this.properties.password;
  }

  get firstName(): string {
    return this.properties.firstName;
  }

  get lastName(): string {
    return this.properties.lastName;
  }

  set id(newId: number | undefined) {
    this.properties.id = newId;
  }
}
