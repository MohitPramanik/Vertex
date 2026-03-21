import { Component, inject, signal } from '@angular/core';
import { Table, TableHeaderActionArea, TableHeaderContentArea } from '../../components/table/table';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

interface Employee {
  employeeId: string;
  name: string;
  email: string;
  department: string;
  role: string;
  manager: string | null;
  status: "Active" | "Inactive";
  joiningDate: string;
};

@Component({
  selector: 'div[app-employee-filter]',
  imports: [ReactiveFormsModule],
  templateUrl: './employee-filter.html',
  styleUrl: './employees.scss',
})
export class EmployeeFilter {

  private formBuilder = inject(FormBuilder);

  searchFilter = this.formBuilder.nonNullable.group({
    searchBy: [''],
    searchValue: [''],
    department: ['all'],
    role: ['all'],
    status: ['all']
  })

  searchValuePlaceholder = "Enter Name"

  constructor() {
    this.searchFilter.get("searchBy")?.valueChanges.subscribe(value => {
      this.searchValuePlaceholder = `Enter ${value}`
    })
  }

  onSubmit() {
    console.log(this.searchFilter.value);
  }

}


@Component({
  selector: 'app-employees',
  imports: [EmployeeFilter, Table, TableHeaderActionArea, TableHeaderContentArea],
  templateUrl: './employees.html',
  styleUrl: './employees.scss',
})
export class Employees {
  role = "Employee";

  employeesList: Employee[] = [
    {
      "employeeId": "EMP001",
      "name": "Amit Sharma",
      "email": "amit.sharma@company.com",
      "department": "Engineering",
      "role": "Employee",
      "manager": "Rahul Verma",
      "status": "Active",
      "joiningDate": "2022-03-15"
    },
    {
      "employeeId": "EMP002",
      "name": "Neha Singh",
      "email": "neha.singh@company.com",
      "department": "HR",
      "role": "HR",
      "manager": "Kavita Mehta",
      "status": "Active",
      "joiningDate": "2021-11-08"
    },
    {
      "employeeId": "EMP003",
      "name": "Rahul Verma",
      "email": "rahul.verma@company.com",
      "department": "Engineering",
      "role": "Manager",
      "manager": "Arjun Malhotra",
      "status": "Active",
      "joiningDate": "2020-07-21"
    },
    {
      "employeeId": "EMP004",
      "name": "Kavita Mehta",
      "email": "kavita.mehta@company.com",
      "department": "HR",
      "role": "Manager",
      "manager": "Arjun Malhotra",
      "status": "Active",
      "joiningDate": "2019-05-10"
    },
    {
      "employeeId": "EMP005",
      "name": "Arjun Malhotra",
      "email": "arjun.malhotra@company.com",
      "department": "Management",
      "role": "Admin",
      "manager": null,
      "status": "Active",
      "joiningDate": "2018-01-12"
    },
    {
      "employeeId": "EMP006",
      "name": "Pooja Gupta",
      "email": "pooja.gupta@company.com",
      "department": "Finance",
      "role": "Employee",
      "manager": "Rakesh Jain",
      "status": "Active",
      "joiningDate": "2023-02-03"
    },
    {
      "employeeId": "EMP007",
      "name": "Rakesh Jain",
      "email": "rakesh.jain@company.com",
      "department": "Finance",
      "role": "Manager",
      "manager": "Arjun Malhotra",
      "status": "Active",
      "joiningDate": "2019-09-18"
    },
    {
      "employeeId": "EMP008",
      "name": "Mohit Patel",
      "email": "mohit.patel@company.com",
      "department": "Engineering",
      "role": "Employee",
      "manager": "Rahul Verma",
      "status": "Active",
      "joiningDate": "2023-06-14"
    },
    {
      "employeeId": "EMP009",
      "name": "Sneha Kapoor",
      "email": "sneha.kapoor@company.com",
      "department": "Marketing",
      "role": "Employee",
      "manager": "Ankit Agarwal",
      "status": "Active",
      "joiningDate": "2022-10-05"
    },
    {
      "employeeId": "EMP010",
      "name": "Ankit Agarwal",
      "email": "ankit.agarwal@company.com",
      "department": "Marketing",
      "role": "Manager",
      "manager": "Arjun Malhotra",
      "status": "Active",
      "joiningDate": "2020-04-22"
    },
    {
      "employeeId": "EMP011",
      "name": "Priya Nair",
      "email": "priya.nair@company.com",
      "department": "Engineering",
      "role": "Employee",
      "manager": "Rahul Verma",
      "status": "Active",
      "joiningDate": "2023-01-11"
    },
    {
      "employeeId": "EMP012",
      "name": "Karan Bansal",
      "email": "karan.bansal@company.com",
      "department": "Engineering",
      "role": "Employee",
      "manager": "Rahul Verma",
      "status": "Inactive",
      "joiningDate": "2021-08-09"
    }
  ]

  restrictExport() {
    switch (this.role) {
      case 'SuperAdmin':
      case 'Admin':
      case 'HR': {
        return true
      }

      default: {
        return false;
      }
    }
  }

  handleActionSelection(event: Event) {
    // if(event.target.value)
    let elem = (event.target as HTMLSelectElement);
    console.log(elem.value);
    elem.value = "";
  }
}
