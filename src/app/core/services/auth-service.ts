import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login, UserClaims } from '../models/auth';
import { jwtDecode, JwtPayload } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.baseUrl + '/api/Account';
  private tokenKey = 'authToken';

  constructor(private http: HttpClient) {}


isLoggedIn(): boolean {
    return !!localStorage.getItem("authToken");
}
  login(model: Login): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Login`, model);
  }

  register(model: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Register`, model);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.clear();
  }


getDecodedToken(token: string): UserClaims | null {
  try {
    return jwtDecode<UserClaims>(token); 
  } catch (err) {
    console.error('Invalid token', err);
    return null;
  }
}

  getUserClaims(): UserClaims | null {
    const token = localStorage.getItem(this.tokenKey);
    if (!token) return null;

    return this.getDecodedToken(token);
  }
}
