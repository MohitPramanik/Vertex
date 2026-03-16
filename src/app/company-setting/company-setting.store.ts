import { Injectable, computed, signal } from '@angular/core';
import { CompanySetting } from './company-setting.models';

const STORAGE_KEY = 'hr.companySetting.v1';

function nowIso(): string {
  return new Date().toISOString();
}

function safeRead(): CompanySetting | null {
  try {
    if (typeof window === 'undefined') return null;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CompanySetting;
    if (!parsed || parsed.version !== 1) return null;
    return parsed;
  } catch {
    return null;
  }
}

function safeWrite(setting: CompanySetting) {
  try {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(setting));
  } catch {
    // ignore
  }
}

function seed(): CompanySetting {
  return {
    version: 1,
    companyName: 'Your Company Name',
    hrEmail: 'hr@company.com',
    timezone: 'Asia/Kolkata',
    weekStartsOn: 'Monday',
    workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    defaultLeavePolicy: { annual: 12, sick: 8, casual: 6 },
    updatedAt: nowIso(),
  };
}

@Injectable({ providedIn: 'root' })
export class CompanySettingStore {
  readonly setting = signal<CompanySetting>(safeRead() ?? seed());

  readonly workingDaysLabel = computed(() => this.setting().workingDays.join(', '));

  update(next: Omit<CompanySetting, 'version' | 'updatedAt'>) {
    const updated: CompanySetting = { ...next, version: 1, updatedAt: nowIso() };
    this.setting.set(updated);
    safeWrite(updated);
  }
}

