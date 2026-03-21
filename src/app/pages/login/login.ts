import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth-service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'div[app-login]',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  host: {
    "class": "h-full"
  }
})
export class Login {
  loginForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl(""),
    remember: new FormControl(false)
  })
  errorMessage: string = "";

  private auth = inject(AuthService);

  onSubmit(): void {
    console.log(this.loginForm.value)
    const {email, password} = this.loginForm.value;
    const isUser = this.auth.login(email ?? "", password ?? "");

    if(isUser) {
      this.errorMessage = "";

      // navigate to dashboard
      this.auth.navigateByUrl("/dashboard");

    }
    else {
      // display error message on login fail
      this.errorMessage = "Invalid email or password. Please try again.";
    }
  }
}
