import { Component, signal } from '@angular/core';
import { Modal } from '../../../components/modal/modal';
import { TimesheetModal } from '../timesheet-modal/timesheet-modal';

@Component({
  selector: 'section[app-timesheet-calendar]',
  imports: [Modal, TimesheetModal],
  templateUrl: './timesheet-calendar.html',
  styleUrl: './timesheet-calendar.scss',
})
export class TimesheetCalendar {
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
