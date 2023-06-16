
import { ApplicationAPI } from "../../../modules/applicationAPI";
import express from 'express'
import bodyParser from 'body-parser'
import { UsersController } from "../../../modules/users/infra/usersController";

type Controllers = {
  usersController: UsersController
}

type ExpressRESTAPIState = {
  application: ApplicationAPI, 
  controllers: Controllers
}

export class ExpressRESTAPI {
  private state: ExpressRESTAPIState;
  private instance: express.Express;

  constructor (state: ExpressRESTAPIState) {
    this.state = state;
    this.instance = express();
    this.setupRoutes();
  }

  setupRoutes () {
    this.instance.use(bodyParser.json());
    this.instance.post('/users', (req, res) => this.state.controllers.usersController.createUser(req, res));
  }

  start () {
    const port = 3000;
    this.instance.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}




