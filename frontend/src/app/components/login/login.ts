import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService) {}

  login(): void {
    if (!this.username || !this.password) {
      this.error = 'Por favor completa todos los campos';
      return;
    }

    if (this.authService.login(this.username, this.password)) {
      this.error = '';
      // Recargar la página para actualizar el estado
      window.location.reload();
    } else {
      this.error = 'Usuario o contraseña incorrectos';
      this.password = '';
    }
  }
}
