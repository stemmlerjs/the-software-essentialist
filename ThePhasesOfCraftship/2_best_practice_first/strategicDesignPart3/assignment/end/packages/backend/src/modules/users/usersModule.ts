import { UsersController } from './usersController';
import { UsersService, userErrorHandler } from '.';
import { Database } from '../../shared/database';
import { TransactionalEmailAPI } from '../marketing/transactionalEmailAPI';

export class UsersModule {
    private usersService: UsersService 
    private usersController: UsersController

    private constructor(private dbConnection: Database, private emailAPI: TransactionalEmailAPI) {
        this.usersService = this.createUsersService();
        this.usersController = this.createUsersController();
    }

    static build(dbConnection: Database, emailAPI: TransactionalEmailAPI) {
        return new UsersModule(dbConnection, emailAPI);
    }

    private createUsersService() {
        return new UsersService(this.dbConnection, this.emailAPI);
    }

    private createUsersController() {
        return new UsersController(this.usersService, userErrorHandler);
    }

    public getUsersController() {
        return this.usersController;
    }

}