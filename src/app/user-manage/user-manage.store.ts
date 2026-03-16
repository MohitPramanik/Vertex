import { Injectable, computed, signal } from '@angular/core';
import { ManagedUser, UserStatus } from './user-manage.models';
import { UserRole } from '../profile/profile.models';

interface UserManageStateV1 {
  version: 1;
  users: ManagedUser[];
}

const STORAGE_KEY = 'hr.userManage.v1';

function nowIso(): string {
  return new Date().toISOString();
}

function randomId(prefix: string): string {
  return `${prefix}-${Math.random().toString(16).slice(2, 8)}-${Date.now().toString(16)}`;
}

function safeRead(): UserManageStateV1 | null {
  try {
    if (typeof window === 'undefined') return null;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as UserManageStateV1;
    if (!parsed || parsed.version !== 1) return null;
    if (!Array.isArray(parsed.users)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function safeWrite(state: UserManageStateV1) {
  try {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

function seed(): UserManageStateV1 {
  return {
    version: 1,
    users: [
      {
        id: 'EMP001',
        name: 'John Doe',
        email: 'john.doe@company.com',
        role: 'Employee',
        status: 'Active',
        createdAt: '2024-06-01T08:00:00.000Z',
      },
      {
        id: 'EMP002',
        name: 'Asha Patel',
        email: 'asha.patel@company.com',
        role: 'HR',
        status: 'Active',
        createdAt: '2024-05-15T08:00:00.000Z',
      },
      {
        id: 'EMP003',
        name: 'Rahul Verma',
        email: 'rahul.verma@company.com',
        role: 'Manager',
        status: 'Active',
        createdAt: '2023-11-20T08:00:00.000Z',
      },
    ],
  };
}

@Injectable({ providedIn: 'root' })
export class UserManageStore {
  private readonly _state = signal<UserManageStateV1>(safeRead() ?? seed());

  readonly users = computed(() => this._state().users.slice().sort((a, b) => a.id.localeCompare(b.id)));
  readonly activeCount = computed(() => this._state().users.filter((u) => u.status === 'Active').length);

  private commit(updater: (s: UserManageStateV1) => UserManageStateV1) {
    const next = updater(this._state());
    this._state.set(next);
    safeWrite(next);
  }

  addUser(input: { id: string; name: string; email: string; role: UserRole; status: UserStatus }) {
    const id = input.id.trim();
    const name = input.name.trim();
    const email = input.email.trim();
    if (!id || !name || !email) return { ok: false as const, error: 'All fields are required.' };
    if (this._state().users.some((u) => u.id.toLowerCase() === id.toLowerCase())) {
      return { ok: false as const, error: 'Employee ID already exists.' };
    }

    const user: ManagedUser = {
      id,
      name,
      email,
      role: input.role,
      status: input.status,
      createdAt: nowIso(),
    };

    this.commit((s) => ({ ...s, users: [...s.users, user] }));
    return { ok: true as const };
  }

  updateUser(userId: string, patch: Partial<Pick<ManagedUser, 'name' | 'email' | 'role' | 'status'>>) {
    this.commit((s) => {
      const idx = s.users.findIndex((u) => u.id === userId);
      if (idx < 0) return s;
      const nextUsers = s.users.slice();
      nextUsers[idx] = { ...nextUsers[idx], ...patch, updatedAt: nowIso() };
      return { ...s, users: nextUsers };
    });
  }

  removeUser(userId: string) {
    this.commit((s) => ({ ...s, users: s.users.filter((u) => u.id !== userId) }));
  }

  resetSeed() {
    this._state.set(seed());
    safeWrite(this._state());
  }
}

