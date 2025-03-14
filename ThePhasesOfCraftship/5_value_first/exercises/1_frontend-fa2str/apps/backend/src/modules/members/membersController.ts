import express from 'express';
import { MemberService } from "./application/membersService";
import { ErrorRequestHandler } from 'express';
import { createJwtCheck } from '../users/externalServices/adapters/auth';
import { API, Commands } from '@dddforum/api/members';
import { Config } from '@dddforum/config';
import { ApplicationErrors } from '@dddforum/errors/application';

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
      req.user.uid
      const commandOrError = Commands.CreateMemberCommand.fromRequest(req.user, req.body);
      if (!commandOrError.isSuccess()) {
        return res.status(401).json({
          success: false,
          error: commandOrError.getError()
        });
      }

      const result = await this.memberService.createMember(commandOrError.getValue());
      if (result.isSuccess()) {
        return res.status(200).json({
          success: true,
          data: result.getValue().toDTO(),
        } as API.CreateMemberAPIResponse);
      } else {
        return res.status(400).json({
          success: false,
          error: result.getError()
        } as API.CreateMemberAPIResponse);
      }
    } catch (err) {
      next(err);
    }
  }

  private setupErrorHandler() {
    this.router.use(this.errorHandler);
  }
}
