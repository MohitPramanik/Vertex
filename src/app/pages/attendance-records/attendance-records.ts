import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AttendanceStore } from '../attendance/attendance.store';
import { monthKey } from '../attendance/attendance.utils';

interface ProjectSummaryRow {
  project: string;
  days: number;
  hours: number;
}

@Component({
  selector: 'section[attendance-records]',
  imports: [RouterLink, FormsModule],
  templateUrl: './attendance-records.html',
  styleUrl: './attendance-records.scss',
})
export class AttendanceRecords {
  readonly attendanceStore = inject(AttendanceStore);

  private readonly currentMonth = monthKey(new Date().toISOString().slice(0, 10)) ?? '2026-03';
  readonly month = signal<string>(this.currentMonth);

  get monthValue() {
    return this.month();
  }
  set monthValue(v: string) {
    this.month.set(v);
  }

  readonly monthEntries = computed(() => this.attendanceStore.getMonthEntries(this.month()));

  readonly kpis = computed(() => {
    const entries = this.monthEntries();
    const totalDays = entries.length;
    const totalHours = entries.reduce((sum, e) => sum + e.hours, 0);
    const avgHours = totalDays ? Math.round((totalHours / totalDays) * 10) / 10 : 0;
    const projects = new Set(entries.map((e) => e.project)).size;
    return { totalDays, totalHours, avgHours, projects };
  });

  readonly projectSummary = computed<ProjectSummaryRow[]>(() => {
    const map = new Map<string, ProjectSummaryRow>();
    for (const e of this.monthEntries()) {
      const existing = map.get(e.project) ?? { project: e.project, days: 0, hours: 0 };
      existing.days += 1;
      existing.hours += e.hours;
      map.set(e.project, existing);
    }
    return [...map.values()].sort((a, b) => b.hours - a.hours);
  });

  readonly maxHours = computed(() => {
    const entries = this.monthEntries();
    return entries.reduce((m, e) => Math.max(m, e.hours), 0) || 8;
  });
}

