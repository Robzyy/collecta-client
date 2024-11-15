export interface Membership {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  recurrencePattern?: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'freeTrial';
    interval: number;
    endAfterOccurrences?: number;
    endByDate?: Date;
  };
  cost?: number;
  currency?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
} 