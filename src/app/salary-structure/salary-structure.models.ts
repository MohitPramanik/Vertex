export interface SalaryComponent {
  label: string;
  amount: number;
}

export interface SalaryStructure {
  version: 1;
  employeeId: string;
  employeeName: string;
  currency: 'INR';
  earnings: SalaryComponent[];
  deductions: SalaryComponent[];
  updatedAt: string; // ISO datetime
}

