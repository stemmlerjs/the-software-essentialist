import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from './entity/user'

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USERNAME || 'test',
    password: process.env.POSTGRES_PASSWORD || 'test',
    database: process.env.POSTGRES_DATABASE || 'test',
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: ['./migrations/*.ts'],
    subscribers: [],
})
