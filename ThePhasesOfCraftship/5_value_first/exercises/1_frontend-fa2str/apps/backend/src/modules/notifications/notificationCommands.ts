
export class SendNotificationCommand {
  memberId: string;
  correspondingEventName: string;

  constructor(props: { memberId: string; correspondingEventName: string }) {
    this.memberId = props.memberId;
    this.correspondingEventName = props.correspondingEventName;
  }
}
