import { Injectable, computed, signal } from '@angular/core';
import { SalaryStructure } from './salary-structure.models';

const STORAGE_KEY = 'hr.payroll.salaryStructure.v1';

function nowIso(): string {
  return new Date().toISOString();
}

function safeRead(): SalaryStructure | null {
  try {
    if (typeof window === 'undefined') return null;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SalaryStructure;
    if (!parsed || parsed.version !== 1) return null;
    if (!Array.isArray(parsed.earnings) || !Array.isArray(parsed.deductions)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function safeWrite(structure: SalaryStructure) {
  try {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(structure));
  } catch {
    // ignore
  }
}

function seed(): SalaryStructure {
  return {
    version: 1,
    employeeId: 'EMP001',
    employeeName: 'John Doe',
    currency: 'INR',
    earnings: [
      { label: 'Basic', amount: 30000 },
      { label: 'HRA', amount: 12000 },
      { label: 'Special Allowance', amount: 8000 },
    ],
    deductions: [
      { label: 'PF', amount: 1800 },
      { label: 'Professional Tax', amount: 200 },
      { label: 'TDS', amount: 500 },
    ],
    updatedAt: nowIso(),
  };
}

@Injectable({ providedIn: 'root' })
export class SalaryStructureStore {
  readonly structure = signal<SalaryStructure>(safeRead() ?? seed());

  readonly gross = computed(() => this.structure().earnings.reduce((sum, c) => sum + (Number(c.amount) || 0), 0));
  readonly totalDeductions = computed(() =>
    this.structure().deductions.reduce((sum, c) => sum + (Number(c.amount) || 0), 0)
  );
  readonly net = computed(() => this.gross() - this.totalDeductions());

  update(structure: SalaryStructure) {
    const next = { ...structure, updatedAt: nowIso() };
    this.structure.set(next);
    safeWrite(next);
  }
}

