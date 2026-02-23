import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  username: string;
  role: 'user' | 'admin';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUser.asObservable();

  // Datos quemados de usuarios pre-registrados
  private registeredUsers = [
    { username: 'usuario', password: 'usuario123', role: 'user' as const },
    { username: 'admin', password: 'admin123', role: 'admin' as const }
  ];

  constructor() {
    // Restaurar el usuario si existe en localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUser.next(JSON.parse(savedUser));
    }
  }

  login(username: string, password: string): boolean {
    const user = this.registeredUsers.find(
      u => u.username === username && u.password === password
    );

    if (user) {
      const currentUser: User = {
        username: user.username,
        role: user.role
      };
      this.currentUser.next(currentUser);
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUser.next(null);
    localStorage.removeItem('currentUser');
  }

  isAuthenticated(): boolean {
    return this.currentUser.value !== null;
  }

  isAdmin(): boolean {
    return this.currentUser.value?.role === 'admin';
  }

  getCurrentUser(): User | null {
    return this.currentUser.value;
  }
}
