import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth-service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Register } from '../../../core/models/auth';

@Component({
  selector: 'app-register-component',
  imports: [FormsModule,RouterLink],
  templateUrl: './register-component.html',
  styleUrl: './register-component.css'
})
export class RegisterComponent {

 form :Register = new Register('','','');

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.register(this.form).subscribe({
      next: () => {
        
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        alert('Registration failed!');
      }
    });
  }
}
