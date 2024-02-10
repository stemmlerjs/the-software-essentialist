import { DataSource } from "typeorm";
import { CreateUserTable1707502129531 } from "./migrations";
import { UserSchema } from "./domain/user-entity";

let dataSourcePromise: Promise<DataSource> | null = null;

export const getDataSource = async () => {
  if (dataSourcePromise !== null) {
    return dataSourcePromise;
  }

  const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "dddforum",
    synchronize: true,
    logging: true,
    entities: [UserSchema],
    subscribers: [],
    migrations: [CreateUserTable1707502129531],
  });

  dataSourcePromise = AppDataSource.initialize();

  return dataSourcePromise;
};
