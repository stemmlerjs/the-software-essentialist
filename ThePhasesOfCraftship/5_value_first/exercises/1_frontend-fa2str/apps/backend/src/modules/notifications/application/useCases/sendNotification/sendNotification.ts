import { success, UseCase, UseCaseResponse } from "@dddforum/core";
import { SendNotificationCommand } from "../../../notificationCommands";
import { ApplicationErrors } from "@dddforum/errors/application";
import { ServerErrors } from "@dddforum/errors/server";
import { TransactionalEmailAPI } from "../../../externalServices/ports/transactionalEmailAPI";

export type SendNotificationResponse = UseCaseResponse<void | undefined, 
  ApplicationErrors.NotFoundError | 
  ServerErrors.AnyServerError>; // TODO: cleanup these errors

export class SendNotification implements UseCase<SendNotificationCommand, SendNotificationResponse>  {

  constructor (
    transactionalEmailAPI: TransactionalEmailAPI
  ) {

  }

  async execute(request: SendNotificationCommand): Promise<SendNotificationResponse> {
      console.log('SendNotification -> Not yet implemented')
      return success(undefined)
    }
}
