
import express from 'express';
import { MemberService } from "./application/membersService";
import { ErrorRequestHandler } from 'express';
import { CreateMemberCommand } from './memberCommands';
import { Config } from '../../shared/config';
import { createJwtCheck } from '../users/externalServices/adapters/auth';
import { CreateMemberAPIResponse } from '@dddforum/api/src/members';
import { Member } from './domain/member';

export class MembersController {
  private router: express.Router;

  constructor(
    private memberService: MemberService,
    private errorHandler: ErrorRequestHandler,
    private config: Config
  ) {
    this.router = express.Router();
    this.setupRoutes();
    this.setupErrorHandler();
  }

  getRouter() {
    return this.router;
  }

  private setupRoutes() {
    let jwtCheck = createJwtCheck(this.config);
    this.router.post("/new", jwtCheck, this.createMember.bind(this));
  }

  private async createMember(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const command = CreateMemberCommand.create(req.user, req.body);
      const result = await this.memberService.createMember(command);

      if (result.isSuccess()) {
        return res.status(200).json({
          success: true,
          data: (result.getValue() as Member).toDTO(),
        } as CreateMemberAPIResponse)
      } else {
        return res.status(400).json({
          success: false,
          error: result.getError()
        } as CreateMemberAPIResponse);
      }
    } catch (err) {
      next(err);
    }
  }

  private setupErrorHandler() {
    this.router.use(this.errorHandler);
  }
}
