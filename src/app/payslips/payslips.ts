import { Component } from '@angular/core';
import { Table } from '../table/table';

@Component({
  selector: 'div.app-payslips',
  imports: [Table],
  templateUrl: './payslips.html',
  styleUrl: './payslips.scss',
})
export class Payslips {
  salaryData = [
  {
    "Month": "February",
    "Year": 2026,
    "Salary": "₹50,000",
    "Deduction": "₹2,500",
    "Net Payable": "₹47,500",
    "Status": "Paid",
    "Download": "payslip_feb_2026.pdf"
  },
  {
    "Month": "January",
    "Year": 2026,
    "Salary": "₹50,000",
    "Deduction": "₹2,500",
    "Net Payable": "₹47,500",
    "Status": "Paid",
    "Download": "payslip_jan_2026.pdf"
  },
  {
    "Month": "December",
    "Year": 2025,
    "Salary": "₹50,000",
    "Deduction": "₹2,500",
    "Net Payable": "₹47,500",
    "Status": "Paid",
    "Download": "payslip_dec_2025.pdf"
  },
  {
    "Month": "November",
    "Year": 2025,
    "Salary": "₹50,000",
    "Deduction": "₹2,500",
    "Net Payable": "₹47,500",
    "Status": "Paid",
    "Download": "payslip_nov_2025.pdf"
  },
  {
    "Month": "October",
    "Year": 2025,
    "Salary": "₹50,000",
    "Deduction": "₹2,500",
    "Net Payable": "₹47,500",
    "Status": "Paid",
    "Download": "payslip_oct_2025.pdf"
  }
]


}
