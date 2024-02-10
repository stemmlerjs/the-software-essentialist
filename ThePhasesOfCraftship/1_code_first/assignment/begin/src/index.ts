import "reflect-metadata";
import {userRouter} from './routes'
import { ValidationError } from "yup";
const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const port = 3000

const errorHandler = (error: any, request:any, response:any, next:any) => {
  console.error(error);
  const status = error.status || 500
  const message = status === 500 ? 'Internal server error' : error.message

  if(error instanceof ValidationError) {
    const validationErrors = error.inner.map((e: any) => {return e.errors.join(', ')}).join(', ');
    response.status(400).send({ error: validationErrors, success: false })
  }
  
  response.status(status).send({ error: message, success: false })
}

const v1Router = express.Router();
v1Router.use('/user', userRouter);

app.use(bodyParser.json());
app.use(v1Router);

app.use(errorHandler);




app.get('/', (req: any, res: any) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})