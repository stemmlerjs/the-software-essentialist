import { success, UseCase, UseCaseResponse } from "@dddforum/core/useCase";
import { SendNotificationCommand } from "../../../notificationCommands";
import { MemberNotFoundError, ServerError } from "@dddforum/errors";
import { TransactionalEmailAPI } from "../../../externalServices/ports/transactionalEmailAPI";

export type SendNotificationResponse = UseCaseResponse<void | undefined, MemberNotFoundError | ServerError>;

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
