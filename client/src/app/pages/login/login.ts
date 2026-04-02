import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth-service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'div[app-login]',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  host: {
    "class": "h-full"
  }
})
export class Login implements OnInit {

  private auth = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  errorMessage = this.auth.errorMessage;

  ngOnInit(): void {
    this.errorMessage.set("");
  }

  loginForm = this.formBuilder.nonNullable.group({
    email: ["", [
      Validators.required,
      Validators.email,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
    ]],
    password: ["", [
      Validators.required,
      Validators.minLength(6)
    ]],
    remember: [false]
  })

  get email() {
    return this.loginForm.get("email")
  }

  get password() {
    return this.loginForm.get("password")
  }

  onSubmit(): void {
    const { email, password } = this.loginForm.getRawValue();
    this.auth.login(email, password);
  }
}
