export interface EventModel {
  id: string;
  name: string;
  data: string;
  aggregateId: string;
  retries: number;
  status: string;
  dateCreated: Date;
}