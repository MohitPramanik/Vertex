import { Component } from '@angular/core';

@Component({
  selector: 'div[app-employee-filter]',
  imports: [],
  templateUrl: './employee-filter.html',
  styleUrl: './employee-filter.scss',
  host: {
    "class": "filters flex flex-wrap gap-4 mb-4 p-4 border rounded bg-gray-300 shadow-sm"
  }
})
export class EmployeeFilter {}
