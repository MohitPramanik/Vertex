import { Component, computed, inject, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SalaryComponent, SalaryStructure } from './salary-structure.models';
import { SalaryStructureStore } from './salary-structure.store';

type ComponentGroup = FormGroup<{
  label: FormControl<string>;
  amount: FormControl<number>;
}>;

type SalaryForm = FormGroup<{
  earnings: FormArray<ComponentGroup>;
  deductions: FormArray<ComponentGroup>;
}>;

function toGroup(c: SalaryComponent): ComponentGroup {
  return new FormGroup({
    label: new FormControl(c.label, { nonNullable: true, validators: [Validators.required, Validators.maxLength(40)] }),
    amount: new FormControl(c.amount, { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
  });
}

function fromGroup(g: ComponentGroup): SalaryComponent {
  return {
    label: g.controls.label.value.trim(),
    amount: Number(g.controls.amount.value) || 0,
  };
}

@Component({
  selector: 'section[salary-structure]',
  imports: [ReactiveFormsModule],
  templateUrl: './salary-structure.html',
  styleUrl: './salary-structure.scss',
})

export class SalaryStructurePage {
  readonly store = inject(SalaryStructureStore);

  readonly error = signal<string>('');
  readonly saved = signal<boolean>(false);

  readonly form: SalaryForm = new FormGroup({
    earnings: new FormArray<ComponentGroup>([]),
    deductions: new FormArray<ComponentGroup>([]),
  });

  constructor() {
    const s = this.store.structure();
    for (const e of s.earnings) this.form.controls.earnings.push(toGroup(e));
    for (const d of s.deductions) this.form.controls.deductions.push(toGroup(d));
  }

  readonly gross = computed(() => this.form.controls.earnings.controls.reduce((sum, g) => sum + (Number(g.value.amount) || 0), 0));
  readonly totalDeductions = computed(() => this.form.controls.deductions.controls.reduce((sum, g) => sum + (Number(g.value.amount) || 0), 0));
  readonly net = computed(() => this.gross() - this.totalDeductions());

  addEarning() {
    this.form.controls.earnings.push(toGroup({ label: 'Allowance', amount: 0 }));
  }

  addDeduction() {
    this.form.controls.deductions.push(toGroup({ label: 'Deduction', amount: 0 }));
  }

  removeEarning(i: number) {
    if (this.form.controls.earnings.length <= 1) return;
    this.form.controls.earnings.removeAt(i);
  }

  removeDeduction(i: number) {
    if (this.form.controls.deductions.length <= 1) return;
    this.form.controls.deductions.removeAt(i);
  }

  save() {
    this.error.set('');
    this.saved.set(false);

    if (this.form.invalid) {
      this.error.set('Please fix validation errors before saving.');
      return;
    }

    const current = this.store.structure();
    const updated: SalaryStructure = {
      ...current,
      earnings: this.form.controls.earnings.controls.map(fromGroup).filter((c) => c.label),
      deductions: this.form.controls.deductions.controls.map(fromGroup).filter((c) => c.label),
      updatedAt: current.updatedAt,
    };

    this.store.update(updated);
    this.saved.set(true);
  }
}

