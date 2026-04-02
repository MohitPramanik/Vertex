import { Component, inject, OnInit, signal } from '@angular/core';
import { Table } from '../../../components/table/table';
import { Modal } from '../../../components/modal/modal';
import { CreateJobModal } from '../create-job-modal/create-job-modal';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../../interfaces/api';

@Component({
  selector: 'app-jobs',
  imports: [Table, CreateJobModal, Modal],
  templateUrl: './jobs.html',
  styleUrl: './jobs.scss',
})

export class Jobs implements OnInit {

  private http = inject(HttpClient);

  jobs = signal([]);
  isCreateJobModalOpen = signal<boolean>(false);

  fetchAllJobs() {
    this.http.get<ApiResponse>("http://localhost:8000/api/job")
      .subscribe(res => {
        if (res.data) {
          this.jobs.set(res.data);
        }
      })
  }

  ngOnInit(): void {
    this.fetchAllJobs();
  }

  openCreateJobModal() {
    this.isCreateJobModalOpen.set(true);
  }

  closeCreateJobModal(value: string | void) {
    if (value === "added") {
      this.fetchAllJobs();
    }
    this.isCreateJobModalOpen.set(false);
  }
}
