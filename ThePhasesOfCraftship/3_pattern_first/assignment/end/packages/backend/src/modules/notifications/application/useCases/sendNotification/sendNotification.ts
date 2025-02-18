import { UseCase, UseCaseResponse } from "@dddforum/shared/src/core/useCase";
import { SendNotificationCommand } from "../../../notificationCommands";
import { MemberNotFoundError, ServerError } from "@dddforum/shared/src/errors";
import { TransactionalEmailAPI } from "../../../externalServices/ports/transactionalEmailAPI";

export type SendNotificationResponse = UseCaseResponse<void | undefined, MemberNotFoundError | ServerError>;

export class SendNotification implements UseCase<SendNotificationCommand, SendNotificationResponse>  {

  constructor (
    transactionalEmailAPI: TransactionalEmailAPI
  ) {

  }

  async execute(request: SendNotificationCommand): Promise<SendNotificationResponse> {
      throw new Error('Not yet implemented')
    }
}
