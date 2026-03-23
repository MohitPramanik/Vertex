import { Component, signal } from '@angular/core';
import { Table } from '../../components/table/table';
import { Modal } from '../../components/modal/modal';
import { CreateDepartmentModal } from './create-department-modal/create-department-modal';

@Component({
  selector: 'app-departments',
  imports: [Table, Modal, CreateDepartmentModal],
  templateUrl: './departments.html',
  styleUrl: './departments.scss',
})
export class Departments {
  isCreateDepartmentModalOpen = signal<boolean>(false);

  departments = [
    {
      "id": 1,
      "name": "Engineering",
      "head": "Amit Sharma",
      "employeeCount": 25,
      "openPositions": 3,
      "status": "Active"
    },
    {
      "id": 2,
      "name": "Design",
      "head": "Priya Verma",
      "employeeCount": 10,
      "openPositions": 2,
      "status": "Active"
    },
    {
      "id": 3,
      "name": "Human Resources",
      "head": "Rahul Singh",
      "employeeCount": 5,
      "openPositions": 1,
      "status": "Active"
    },
    {
      "id": 4,
      "name": "Marketing",
      "head": null,
      "employeeCount": 8,
      "openPositions": 0,
      "status": "Inactive"
    }
  ]

  openCreateDepartmentModal() {
    this.isCreateDepartmentModalOpen.set(true);
  }

  closeCreateDepartmentModal() {
    this.isCreateDepartmentModalOpen.set(false);
  }
}
