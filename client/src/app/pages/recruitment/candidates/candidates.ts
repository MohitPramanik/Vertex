import { Component, signal } from '@angular/core';
import { Table } from '../../../components/table/table';
import { Modal } from '../../../components/modal/modal';
import { CreateCandidateModal } from '../create-candidate-modal/create-candidate-modal';

@Component({
  selector: 'app-candidates',
  imports: [Table, Modal, CreateCandidateModal],
  templateUrl: './candidates.html',
})

export class Candidates {

  isCreateCandidateModalOpen = signal<boolean>(false);

  openCreateCandidateModal() {
    this.isCreateCandidateModalOpen.set(true);
  }
  
  candidates = [
    {
      "id": 101,
      "name": "Amit Sharma",
      "email": "amit.sharma@example.com",
      "jobId": 1,
      "jobTitle": "Frontend Developer",
      "experience": 2,
      "status": "Applied"
    },
    {
      "id": 102,
      "name": "Priya Verma",
      "email": "priya.verma@example.com",
      "jobId": 2,
      "jobTitle": "Backend Developer",
      "experience": 3,
      "status": "Interview"
    },
    {
      "id": 103,
      "name": "Rahul Singh",
      "email": "rahul.singh@example.com",
      "jobId": 1,
      "jobTitle": "Frontend Developer",
      "experience": 1,
      "status": "Screening"
    },
    {
      "id": 104,
      "name": "Sneha Kapoor",
      "email": "sneha.kapoor@example.com",
      "jobId": 3,
      "jobTitle": "UI/UX Designer",
      "experience": 4,
      "status": "Selected"
    },
    {
      "id": 105,
      "name": "Vikram Patel",
      "email": "vikram.patel@example.com",
      "jobId": 4,
      "jobTitle": "HR Executive",
      "experience": 2,
      "status": "Rejected"
    }
  ];
  
}
