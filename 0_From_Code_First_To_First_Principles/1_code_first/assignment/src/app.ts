import express, { Request, Response } from 'express';
import 'dotenv/config';
import * as mongoose from 'mongoose';
import { UserController } from './controllers';
import {errorMiddleware} from './middlewares';

const {MONGO_USER, MONGO_PASSWORD, MONGO_SERVER, MONGO_DB, PORT} = process.env;

mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_SERVER}/${MONGO_DB}?retryWrites=true&w=majority`);
// const mongoDbConnection = mongoose.connection;
// mongoDbConnection.once('open', () => {console.log('connected')});

const app = express();

app.use(express.json());

app.use(new UserController('/users').router);

app.use(errorMiddleware)

// app.listen(PORT, () => {
//     console.log(`app listening to the port ${PORT}`);
// });

export default app;