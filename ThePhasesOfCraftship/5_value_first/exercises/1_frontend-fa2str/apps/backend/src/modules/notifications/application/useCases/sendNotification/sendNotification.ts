import { Result, UseCase } from "@dddforum/core";
import { SendNotificationCommand } from "../../../notificationCommands";
import { ApplicationErrors } from "@dddforum/errors/application";
import { ServerErrors } from "@dddforum/errors/server";
import { TransactionalEmailAPI } from "../../../externalServices/ports/transactionalEmailAPI";

type SendNotificationError = 
  | ApplicationErrors.NotFoundError 
  | ServerErrors.AnyServerError;

export class SendNotification implements UseCase<SendNotificationCommand, Result<void, SendNotificationError>>  {
  constructor(
    transactionalEmailAPI: TransactionalEmailAPI
  ) {}

  async execute(request: SendNotificationCommand): Promise<Result<void, SendNotificationError>> {
    console.log('SendNotification -> Not yet implemented');
    return Result.success(undefined);
  }
}
