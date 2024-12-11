import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { JwtPayload } from '../../interfaces/jwt-payload.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(
    this.getUserFromStorage(),
  );
  public currentUser$ = this.currentUserSubject.asObservable();
  private tokenSubject = new BehaviorSubject<string | null>(
    localStorage.getItem('token'),
  );
  public token$ = this.tokenSubject.asObservable();
  private logoutMessageSubject = new BehaviorSubject<string | null>(null);
  public logoutMessage$ = this.logoutMessageSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  private getUserFromStorage(): User | null {
    try {
      const userStr = localStorage.getItem('currentUser');
      if (!userStr) return null;
      return JSON.parse(userStr);
    } catch (error) {
      console.warn('Error parsing user from localStorage:', error);
      localStorage.removeItem('currentUser');
      return null;
    }
  }

  private decodeToken(token: string): JwtPayload | null {
    try {
      return JSON.parse(atob(token.split('.')[1])) as JwtPayload;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.tokenSubject.value;
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  login(email: string, password: string): Observable<any> {
    return new Observable((observer) => {
      this.http
        .post<{
          user: User;
          token: string;
        }>('/api/v1/auth/login', { email, password })
        .subscribe({
          next: (response) => {
            localStorage.setItem('currentUser', JSON.stringify(response.user));
            localStorage.setItem('token', response.token);
            this.currentUserSubject.next(response.user);
            this.tokenSubject.next(response.token);

            observer.next(response);
            observer.complete();

            this.router.navigate(['/calendar']);
          },
          error: (error) => observer.error(error),
        });
    });
  }

  register(userData: Partial<User>): Observable<any> {
    return new Observable((observer) => {
      this.http
        .post<{ user: User; token: string }>('/api/v1/auth/register', userData)
        .subscribe({
          next: (response) => {
            localStorage.setItem('currentUser', JSON.stringify(response.user));
            localStorage.setItem('token', response.token);
            this.currentUserSubject.next(response.user);
            this.tokenSubject.next(response.token);

            observer.next(response);
            observer.complete();

            this.router.navigate(['/calendar']);
          },
          error: (error) => observer.error(error),
        });
    });
  }

  logout(message?: string): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.tokenSubject.next(null);
    if (message) {
      this.logoutMessageSubject.next(message);
    }
    this.router.navigate(['/login']);
  }

  clearLogoutMessage(): void {
    this.logoutMessageSubject.next(null);
  }

  getCurrentUserId(): string | null {
    const token = this.tokenSubject.value;
    if (!token) return null;

    const payload = this.decodeToken(token);
    return payload?.userId || null;
  }

  getDecodedToken(): JwtPayload | null {
    const token = this.tokenSubject.value;
    return token ? this.decodeToken(token) : null;
  }

  isLoggedIn(): boolean {
    const token = this.tokenSubject.value;
    if (!token) return false;

    const payload = this.decodeToken(token);
    if (!payload) return false;

    return payload.exp * 1000 > Date.now();
  }
}
