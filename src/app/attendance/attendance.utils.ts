export function formatDateOnly(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function parseDateOnly(dateOnly: string): Date | null {
  const parts = dateOnly.split('-').map((p) => Number(p));
  if (parts.length !== 3) return null;
  const [year, month, day] = parts;
  if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) return null;
  const date = new Date(year, month - 1, day);
  if (Number.isNaN(date.getTime())) return null;
  return date;
}

export function isWeekend(dateOnly: string): boolean {
  const date = parseDateOnly(dateOnly);
  if (!date) return false;
  const d = date.getDay();
  return d === 0 || d === 6;
}

export function monthKey(dateOnly: string): string | null {
  const date = parseDateOnly(dateOnly);
  if (!date) return null;
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

