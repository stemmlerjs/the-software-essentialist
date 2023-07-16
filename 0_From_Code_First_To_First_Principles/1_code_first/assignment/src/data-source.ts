import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from './entity/user'

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USERNAME || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    database: process.env.POSTGRES_DATABASE || 'ddd-db',
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: ['./migrations/*.ts'],
    subscribers: [],
})
