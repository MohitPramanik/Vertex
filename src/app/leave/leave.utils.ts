import { LeaveType } from './leave.models';

export function parseDateOnly(dateOnly: string): Date | null {
  // Expect YYYY-MM-DD from <input type="date">
  const parts = dateOnly.split('-').map((p) => Number(p));
  if (parts.length !== 3) return null;
  const [year, month, day] = parts;
  if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) return null;
  const date = new Date(year, month - 1, day);
  if (Number.isNaN(date.getTime())) return null;
  return date;
}

export function formatDateOnly(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function isWeekend(date: Date): boolean {
  const d = date.getDay();
  return d === 0 || d === 6;
}

export function countWorkingDaysInclusive(startDateOnly: string, endDateOnly: string): number | null {
  const start = parseDateOnly(startDateOnly);
  const end = parseDateOnly(endDateOnly);
  if (!start || !end) return null;
  if (start.getTime() > end.getTime()) return null;

  const msPerDay = 24 * 60 * 60 * 1000;
  const daysBetween = Math.floor((end.getTime() - start.getTime()) / msPerDay);
  if (daysBetween > 366) return null;

  let count = 0;
  for (let i = 0; i <= daysBetween; i++) {
    const current = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
    if (!isWeekend(current)) count++;
  }
  return count;
}

export function isPaidLeaveType(type: LeaveType): type is Exclude<LeaveType, 'Unpaid'> {
  return type !== 'Unpaid';
}
