import { Injectable, signal } from '@angular/core';
import { UserProfile } from './profile.models';

const STORAGE_KEY = 'hr.profile.v1';

function nowIso(): string {
  return new Date().toISOString();
}

function safeRead(): UserProfile | null {
  try {
    if (typeof window === 'undefined') return null;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as UserProfile;
    if (!parsed || parsed.version !== 1) return null;
    return parsed;
  } catch {
    return null;
  }
}

function safeWrite(profile: UserProfile) {
  try {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // ignore
  }
}

function seed(): UserProfile {
  return {
    version: 1,
    employeeId: 'EMP001',
    name: 'John Doe',
    email: 'john.doe@company.com',
    phone: '+91 90000 00000',
    role: 'Employee',
    department: 'Engineering',
    location: 'Bengaluru',
    joinedOn: '2024-06-01',
    updatedAt: nowIso(),
  };
}

@Injectable({ providedIn: 'root' })
export class ProfileStore {
  readonly profile = signal<UserProfile>(safeRead() ?? seed());

  update(partial: Omit<UserProfile, 'version' | 'updatedAt'>) {
    const next: UserProfile = { ...partial, version: 1, updatedAt: nowIso() };
    this.profile.set(next);
    safeWrite(next);
  }
}

