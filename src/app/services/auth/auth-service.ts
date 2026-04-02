import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserRole } from '../../interfaces/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  // private users: User[] = [
  //   { id: 1, email: "admin@gmail.com", password: "admin123", role: "admin" },
  //   { id: 2, email: "manager@gmail.com", password: "manager123", role: "manager" },
  //   { id: 3, email: "employee@gmail.com", password: "employee123", role: "employee" },
  //   { id: 3, email: "hr@gmail.com", password: "hr123", role: "hr" },
  //   { id: 3, email: "superadmin@gmail.com", password: "superadmin123", role: "superAdmin" }
  // ]

  public currentUser: User | null = null;
  private router = inject(Router);
  errorMessage = signal<string>("");

  constructor(private http: HttpClient) { }

  signup(username: string, email: string, password: string, agreeTerms: boolean): void {
    this.http.post("http://localhost:8000/api/auth/register", {
      username, email, password, agreeTerms
    }).subscribe({
      next: (result: any) => {
        this.errorMessage.set("");
        this.login(email, password);
      },
      error: (error: any) => {
        console.log(error);
         this.errorMessage.set(error.error.message);
      }
    })
  }

  login(email: string, password: string): void{

    this.http.post("http://localhost:8000/api/auth/login", {
      email,
      password
    }).subscribe({
      next: (result: any) => {
        this.errorMessage.set("");
        this.currentUser = result.data.user;

        localStorage.setItem('currentUser', JSON.stringify(result.data.user));
        localStorage.setItem('accessToken', JSON.stringify(result.data.accessToken));
        
        this.navigateByUrl("/dashboard");
        return true;
      },
      error: (error: any) => {
        console.log("Error", error.error.message);
        this.errorMessage.set(error.error.message);
        return false;
      }
    })
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem("currentUser");
    localStorage.removeItem("accessToken");
    this.navigateByUrl("/login");
  }

  getCurrentUser(): User | null {
    if (!this.currentUser) {
      const userData = localStorage.getItem("currentUser");

      if (userData) {
        this.currentUser = JSON.parse(userData) as User;
      }
    }

    return this.currentUser;
  } 

  getCurrentRole(): UserRole | null {
    const user = this.getCurrentUser();
    return user ? user.role : null;
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }

  hasRole(role: UserRole): boolean {
    if (Array.isArray(role)) {
      return role.includes(this.getCurrentUser?.()?.role)
    }
    return this.getCurrentUser()?.role === role;
  }

  navigateByUrl(url: string): void {
    this.router.navigateByUrl(url, { replaceUrl: true });
  }
}
