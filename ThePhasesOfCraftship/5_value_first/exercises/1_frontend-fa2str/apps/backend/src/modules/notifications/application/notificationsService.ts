
import { TransactionalEmailAPI } from "../externalServices/ports/transactionalEmailAPI";
import { SendNotificationCommand } from "../notificationCommands";
import { SendNotification } from "./useCases/sendNotification/sendNotification";

export class NotificationsService {
  private transactionalEmailAPI: TransactionalEmailAPI;

  constructor(transactionalEmailAPI: TransactionalEmailAPI) {
    this.transactionalEmailAPI = transactionalEmailAPI;
  }

  public sendNotification(command: SendNotificationCommand) {
    return new SendNotification(this.transactionalEmailAPI).execute(command);
  }
}
