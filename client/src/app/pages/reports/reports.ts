import { Component } from '@angular/core';
import { Table } from '../../components/table/table';

@Component({
  selector: 'app-reports',
  imports: [Table],
  templateUrl: './reports.html',
  styleUrl: './reports.scss',
})
export class Reports {
  // departments-summary.ts
  departmentsReport = [
    {
      id: 1,
      name: "Engineering",
      totalEmployees: 25,
      openPositions: 5,
      activeJobs: 8
    },
    {
      id: 2,
      name: "Design",
      totalEmployees: 10,
      openPositions: 2,
      activeJobs: 3
    },
    {
      id: 3,
      name: "HR",
      totalEmployees: 5,
      openPositions: 1,
      activeJobs: 1
    },
    {
      id: 4,
      name: "Marketing",
      totalEmployees: 8,
      openPositions: 0,
      activeJobs: 2
    },
    {
      id: 5,
      name: "Finance",
      totalEmployees: 6,
      openPositions: 1,
      activeJobs: 1
    }
  ];

  candidatesReport = [
    {
      id: 101,
      name: "Amit Sharma",
      jobTitle: "Frontend Developer",
      department: "Engineering",
      stage: "Interview",
      status: "Active"
    },
    {
      id: 102,
      name: "Priya Verma",
      jobTitle: "Backend Developer",
      department: "Engineering",
      stage: "Screening",
      status: "Active"
    },
    {
      id: 103,
      name: "Sneha Kapoor",
      jobTitle: "UI/UX Designer",
      department: "Design",
      stage: "Applied",
      status: "Active"
    },
    {
      id: 104,
      name: "Rahul Singh",
      jobTitle: "HR Executive",
      department: "HR",
      stage: "Selected",
      status: "Active"
    },
    {
      id: 105,
      name: "Vikram Patel",
      jobTitle: "Marketing Manager",
      department: "Marketing",
      stage: "Rejected",
      status: "Inactive"
    }
  ];
}
