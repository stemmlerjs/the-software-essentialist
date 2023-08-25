import express from 'express';
import 'dotenv/config';
import * as mongoose from 'mongoose';
import { UserController } from './controllers';

const {MONGO_USER, MONGO_PASSWORD, MONGO_SERVER, MONGO_DB, PORT} = process.env;

mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_SERVER}/${MONGO_DB}?retryWrites=true&w=majority`)

const app = express();

app.use(express.json());

app.use(new UserController().router);

app.listen(PORT, () => {
    console.log(`app listening to the port ${PORT}`);
});