import { EntitySchema } from "typeorm";
import { UserProperties } from "./user";

export const UserSchema = new EntitySchema<UserProperties>({
  name: "user",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: "increment",
    },
    userName: {
      type: "varchar",
      unique: true,
    },
    email: {
      type: "varchar",
      unique: true,
    },
    firstName: {
      type: "varchar",
      name: "first_name",
    },
    lastName: {
      type: "varchar",
      name: "last_name",
    },
  },
});
