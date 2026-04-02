import { HttpClient } from "@angular/common/http";
import { Component, inject, OnInit, signal } from "@angular/core";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { ApiResponse } from "../../interfaces/api";

interface Department {
    _id: string;
    name: string;
}

@Component({
    selector: 'div[app-employee-filter]',
    imports: [ReactiveFormsModule],
    templateUrl: './employee-filter.html',
    styleUrl: './employees.scss',
})

export class EmployeeFilter implements OnInit {

    private http = inject(HttpClient);
    private formBuilder = inject(FormBuilder);

    departments = signal<Department[]>([]);

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

    ngOnInit(): void {
        this.http.get<ApiResponse>("http://localhost:8000/api/department")
            .subscribe(res => {
                this.departments.set(res.data);
            })
    }

    onSubmit() {
        console.log(this.searchFilter.value);
    }

}