import { Component, inject, OnInit, signal } from '@angular/core';
import { Table } from '../../components/table/table';
import { Modal } from '../../components/modal/modal';
import { CreateDepartmentModal } from './create-department-modal/create-department-modal';
import { HttpClient } from '@angular/common/http';

interface Department {
  name: string;
  head: string;
  employeesCount: number,
  openPositions: number,
  status: "active" | "inactive"
}

interface ApiResponse {
  status: string;
  data: [];
}

@Component({
  selector: 'app-departments',
  imports: [Table, Modal, CreateDepartmentModal],
  templateUrl: './departments.html',
  styleUrl: './departments.scss',
})
export class Departments implements OnInit {

  private http = inject(HttpClient);

  isCreateDepartmentModalOpen = signal<boolean>(false);
  departments = signal<Department[]>([]);

  fetchAllDepartments() {
    this.http.get<ApiResponse>("http://localhost:8000/api/department")
      .subscribe(res => {
        if (res.data) {
          this.departments.set(res.data);
        }
      })
  }

  ngOnInit(): void {
    this.fetchAllDepartments()
  }

  openCreateDepartmentModal() {
    this.isCreateDepartmentModalOpen.set(true);
  }

  closeCreateDepartmentModal(value: string | void) {
    if(value === "added") {
      this.fetchAllDepartments();
    }
    this.isCreateDepartmentModalOpen.set(false);
  }
}
