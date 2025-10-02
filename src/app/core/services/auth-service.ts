import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.baseUrl + '/api/Account';
  private tokenKey = 'authToken';

  constructor(private http: HttpClient) {}


 isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }  
  login(model: Login): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Login`, model);
  }

  register(model: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Register`, model);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }
}
