import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private userRoleSubject = new BehaviorSubject<string>('guest'); // Inicialmente, el rol es "guest"
  userRole$ = this.userRoleSubject.asObservable();
  
  private userName = new BehaviorSubject<string>('anonimo'); // Inicialmente, el rol es "guest"
  userName$ = this.userName.asObservable();

  private isLoggedIn = false;

  constructor() {
    // Obtener el estado de autenticación del localStorage al inicializar el servicio
    this.isLoggedInSubject.next(!!localStorage.getItem('isLoggedIn'));

    // Obtener el rol del usuario del localStorage al inicializar el servicio
    const storedRole = localStorage.getItem('rol');
    if (storedRole) {
      this.userRoleSubject.next(storedRole);
    }

    const storedName = localStorage.getItem('nombre');
    if (storedRole) {
      this.userName.next(storedName!);
    }
  }

  login() {
    // Lógica de inicio de sesión
    this.isLoggedIn = true;
    this.isLoggedInSubject.next(true);
    localStorage.setItem('isLoggedIn', 'true');

    const storedRole = localStorage.getItem('rol');
    this.userRoleSubject.next(storedRole!);
    
    const storedName = localStorage.getItem('nombre');
    this.userName.next(storedName!);
  }

  logout() {
    // Lógica de cierre de sesión
    this.isLoggedIn = false;
    this.isLoggedInSubject.next(false);
    // localStorage.removeItem('isLoggedIn');
    // Cierre de sesion de rol
    // localStorage.removeItem('rol');
    // Cierre de sesion de rol
    // localStorage.removeItem('nombre');
    localStorage.clear();

  }

  isAuthenticated(): boolean {
    // Verificar si el usuario está autenticado
    return this.isLoggedIn || localStorage.getItem('isLoggedIn') === 'true';
  }
}
