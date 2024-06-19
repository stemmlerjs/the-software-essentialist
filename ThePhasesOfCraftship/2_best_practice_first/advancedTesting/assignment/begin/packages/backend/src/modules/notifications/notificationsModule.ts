import { TransactionalEmailAPI } from "./transactionalEmailAPI";

export class NotificationsModule {
  private transactionalEmailAPI: TransactionalEmailAPI;

  private constructor() {
    this.transactionalEmailAPI = this.createTransactionalEmailAPI();
  }

  static build() {
    return new NotificationsModule();
  }

  public getTransactionalEmailAPI() {
    return this.transactionalEmailAPI;
  }

  private createTransactionalEmailAPI() {
    return new TransactionalEmailAPI();
  }
}
