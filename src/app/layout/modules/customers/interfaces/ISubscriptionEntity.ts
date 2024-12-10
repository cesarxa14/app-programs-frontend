export interface ISubscriptionInterface {
  id: number;
  package_name: string;
  startDate: Date;
  endDate: Date;
  user_id: number;
  created_at: Date;
  updated_at: Date;
}