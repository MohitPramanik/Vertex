import { Component, inject, OnInit, signal } from '@angular/core';
import { Table, TableHeaderActionArea, TableHeaderContentArea } from '../../components/table/table';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../interfaces/api';
import { EmployeeFilter } from './employee-filter';

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
  selector: 'app-employees',
  imports: [EmployeeFilter, Table, TableHeaderActionArea, TableHeaderContentArea],
  templateUrl: './employees.html',
  styleUrl: './employees.scss',
})

export class Employees implements OnInit {
  role = "Employee";

  private http = inject(HttpClient);

  employeesList = signal<Employee[]>([]);

  ngOnInit(): void {
    this.http.get<ApiResponse>("http://localhost:8000/api/employee?page=1&limit=10")
      .subscribe(res => {
        if(res.data) {
          this.employeesList.set(res.data);
        }
      })
  }

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
