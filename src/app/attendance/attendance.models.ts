export interface TimeEntry {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string; // YYYY-MM-DD
  hours: number; // 1..24
  project: string;
  description: string;
  createdAt: string; // ISO datetime
  updatedAt?: string; // ISO datetime
}

