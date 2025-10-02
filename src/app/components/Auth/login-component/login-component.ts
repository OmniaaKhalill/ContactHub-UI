import { Component } from '@angular/core';
import { Login } from '../../../core/models/auth';
import { AuthService } from '../../../core/services/auth-service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-component',
  imports: [RouterLink,FormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css'
})
export class LoginComponent {

form: Login = new Login('', ''); 
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {

    console.log("in login method ")
    if (!this.form.email || !this.form.password) {
      this.errorMessage = "Email and Password are required";
      return;
    }

    this.authService.login(this.form).subscribe({
      next: (response) => {
        console.log("Login success:", response);

        localStorage.setItem("authToken", response.token);

        this.router.navigateByUrl('/home'); // redirect to profiles page after login
      },
      error: (err) => {
        console.error("Login failed:", err);
        this.errorMessage = "Invalid email or password";
      }
      
    });
  }
}
