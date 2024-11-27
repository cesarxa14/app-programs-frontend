export interface ISubscriptionInterface {
  id: number;
  service: string;
  startDate: Date;
  endDate: Date;
  user_id: number;
  created_at: Date;
  updated_at: Date;
}