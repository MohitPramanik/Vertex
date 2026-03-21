import { Component, inject, output, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Modal } from "../../components/modal/modal";
import { Observable } from "rxjs";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "div[attendance-modal-form]",
  templateUrl: "./attendance-modal-form.html",
  imports: [ReactiveFormsModule],
  styleUrl: "./attendance.scss",
  host: {
    "class": "w-full"
  }
})

export class AttendanceModalForm {
  workHours = Array.from({ length: 9 });
  projects = ["MLCHC", "Quality Now", "SilverBullet", "Internal"];
  today = new Date();
  isSubmitted = output<void>();

  maxDate = this.formatDate(this.today);
  // min date would be prev 5 days
  minDate = this.formatDate(
    new Date(this.today.getTime() - 5 * 24 * 60 * 60 * 1000)
  );
  isSaved = false;


  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  canDeactivate(): boolean | Observable<boolean> {
    if (!this.isSaved) {
      return confirm('You have unsaved changes. Do you really want to leave');
    }

    return true;
  }

  private formBuilder = inject(FormBuilder);

  timeSheet = this.formBuilder.nonNullable.group({
    date: [this.formatDate(this.today)],
    workHours: [0],
    project: [''],
    description: ['']
  })

  onSubmit() {
    console.log(this.timeSheet.value);
    this.isSubmitted.emit();
  }

  constructor() {
    console.log(this.formatDate(this.today));
  }
}

@Component({
  selector: "section[attendance-calendar]",
  templateUrl: "./attendance.html",
  styleUrl: "./attendance.scss",
  imports: [Modal, AttendanceModalForm],
})

export class Attendance {
  // private readonly attendanceStore = inject(AttendanceStore);
  calendarDays: string[] = []
  calendarBlocks: string[][] = [];
  days: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  today = new Date();
  isTimeSheetModelOpen = signal<boolean>(false);

  constructor() {
    let currentMonthStartDayIndex = (new Date(this.today.getFullYear(), this.today.getMonth(), 1)).getDay();
    let currentMonthLastDate = (new Date(this.today.getFullYear(), this.today.getMonth() + 1, 0)).getDate();
    let previousMonthLastDate = (new Date(this.today.getFullYear(), this.today.getMonth(), 0)).getDate();

    // previous months days for 1st week
    for (let i = previousMonthLastDate - currentMonthStartDayIndex + 1; i <= previousMonthLastDate; i++) {
      this.calendarDays.push(`${i}`)
    }

    // current month days
    for (let i = 1; i <= currentMonthLastDate; i++) {
      this.calendarDays.push(`${i}`)
    }

    // next month days for last week
    let i = 1;
    while (this.calendarDays.length < 35) {
      this.calendarDays.push(`${i}`);
      i++;
    }

    // spliting days into block of 7 (week days);
    for (let i = 0; i < 5; i++) {
      this.calendarBlocks.push(this.calendarDays.slice(7 * i, 7 * (i + 1)));
    }
  }

  // function to check which date cell should be disabled
  isDisabled(i: number, calendarDate: string): boolean {
    let date: number = Number(calendarDate);
    if (
      (i === 0 && (date > 15 && date <= 31)) || // if first row and previous month dates
      (i === 4 && date < 8) || // if last row and next month dates
      (date < this.today.getDate() - 5) // if date is of 5 days back (which is non-editable)
    ) {
      return true;
    }
    return false;
  }

  handleCellClick(i: number, calendarDate: string) {
    if (!this.isDisabled(i, calendarDate)) {
      this.isTimeSheetModelOpen.set(true);
    }
  }

  handleCloseBtnClick() {
    this.isTimeSheetModelOpen.set(false);
  }

}
