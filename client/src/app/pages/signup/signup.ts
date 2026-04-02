import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth-service';

@Component({
  selector: 'app-signup',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup implements OnInit {

  private auth = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  errorMessage = this.auth.errorMessage;
  
  ngOnInit(): void {
    this.errorMessage.set("");
  }

  signUpForm = this.formBuilder.nonNullable.group({
    username: ["", [
      Validators.required,
      Validators.minLength(3)
    ]],
    email: ["", [
      Validators.required,
      Validators.email,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
    ]],
    password: ["", [
      Validators.required,
      Validators.minLength(6)
    ]],
    confirmPassword: ["", [
      Validators.required,
      Validators.minLength(6),
    ]],
    isAgree: [false, [Validators.requiredTrue]]
  },
    { validators: this.passwordMatchValidator })

  showError(controlName: string, errorName: string) {
    const control = this.signUpForm.get(controlName);

    return control?.invalid && (control.dirty || control.touched) && control.hasError(errorName);
  }

  passwordMatchValidator(form: AbstractControl) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (password === confirmPassword) {
      return null;
    }

    return { passwordMismatch: true };
  }

  onSubmit() {
    const {username, email, password, isAgree} = this.signUpForm.getRawValue();
    this.auth.signup(username, email, password, isAgree);
  }
}
