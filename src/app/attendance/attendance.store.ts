import { Injectable, computed, signal } from '@angular/core';
import { TimeEntry } from './attendance.models';
import { formatDateOnly, isWeekend, monthKey, parseDateOnly } from './attendance.utils';

interface AttendanceStateV1 {
  version: 1;
  entries: TimeEntry[];
}

const STORAGE_KEY = 'hr.attendance.v1';

function nowIso(): string {
  return new Date().toISOString();
}

function randomId(prefix: string): string {
  return `${prefix}-${Math.random().toString(16).slice(2, 8)}-${Date.now().toString(16)}`;
}

function safeReadState(): AttendanceStateV1 | null {
  try {
    if (typeof window === 'undefined') return null;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AttendanceStateV1;
    if (!parsed || parsed.version !== 1) return null;
    if (!Array.isArray(parsed.entries)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function safeWriteState(state: AttendanceStateV1) {
  try {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

function seedState(): AttendanceStateV1 {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const entries: TimeEntry[] = [];
  let added = 0;
  for (let i = 0; i < 31 && added < 10; i++) {
    const d = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth(), startOfMonth.getDate() + i);
    const dateOnly = formatDateOnly(d);
    if (isWeekend(dateOnly)) continue;
    entries.push({
      id: randomId('TE'),
      employeeId: 'EMP001',
      employeeName: 'John Doe',
      date: dateOnly,
      hours: 8,
      project: i % 2 === 0 ? 'Quality Now' : 'SilverBullet',
      description: 'Regular work',
      createdAt: new Date(d.getTime() + 9 * 60 * 60 * 1000).toISOString(),
    });
    added++;
  }
  return { version: 1, entries };
}

@Injectable({ providedIn: 'root' })
export class AttendanceStore {
  readonly currentEmployee = signal({ id: 'EMP001', name: 'John Doe' });

  private readonly _state = signal<AttendanceStateV1>(safeReadState() ?? seedState());

  readonly entries = computed(() =>
    this._state()
      .entries.slice()
      .sort((a, b) => b.date.localeCompare(a.date))
  );

  private commit(updater: (s: AttendanceStateV1) => AttendanceStateV1) {
    const next = updater(this._state());
    this._state.set(next);
    safeWriteState(next);
  }

  upsertEntry(input: { date: string; hours: number; project: string; description: string }) {
    const date = parseDateOnly(input.date);
    if (!date) return { ok: false as const, error: 'Invalid date.' };
    if (isWeekend(input.date)) return { ok: false as const, error: 'Weekend dates are not allowed.' };
    if (!Number.isFinite(input.hours) || input.hours <= 0 || input.hours > 24) {
      return { ok: false as const, error: 'Hours must be between 1 and 24.' };
    }
    if (!input.project.trim()) return { ok: false as const, error: 'Project is required.' };

    const employee = this.currentEmployee();

    this.commit((s) => {
      const existingIdx = s.entries.findIndex((e) => e.employeeId === employee.id && e.date === input.date);
      const nextEntries = s.entries.slice();
      if (existingIdx >= 0) {
        const existing = nextEntries[existingIdx];
        nextEntries[existingIdx] = {
          ...existing,
          hours: input.hours,
          project: input.project.trim(),
          description: input.description.trim(),
          updatedAt: nowIso(),
        };
      } else {
        nextEntries.push({
          id: randomId('TE'),
          employeeId: employee.id,
          employeeName: employee.name,
          date: input.date,
          hours: input.hours,
          project: input.project.trim(),
          description: input.description.trim(),
          createdAt: nowIso(),
        });
      }
      return { ...s, entries: nextEntries };
    });

    return { ok: true as const };
  }

  getMonthEntries(month: string) {
    // month: YYYY-MM
    return this.entries().filter((e) => monthKey(e.date) === month);
  }

  getCurrentEmployeeEntryByDate(date: string) {
    const employee = this.currentEmployee();
    return this._state().entries.find((e) => e.employeeId === employee.id && e.date === date);
  }
}
