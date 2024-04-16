
export interface MarketingService {
  addEmailToList (email: string): Promise<boolean>;
}