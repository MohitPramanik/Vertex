export interface CompanySetting {
  version: 1;
  companyName: string;
  hrEmail: string;
  timezone: string;
  weekStartsOn: 'Monday' | 'Sunday';
  workingDays: ('Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun')[];
  defaultLeavePolicy: {
    annual: number;
    sick: number;
    casual: number;
  };
  updatedAt: string; // ISO datetime
}

