export interface Membership {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  recurrencePattern?: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'freeTrial';
    interval: number;
    endAfterOccurrences?: number;
  };
  cost?: number;
  currency?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
