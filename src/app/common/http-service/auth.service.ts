// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login(value: any, value1: any) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;
  currentUserValue: any;

  constructor(private http: HttpClient) {}

  

  sendOtp(mobile: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': this.apiKey,
    });

    return this.http.post(`${this.apiUrl}/SignIn/login`, { mobile }, { headers });
  }


    // Verify OTP
    verifyOtp(mobile: string, otp_code: string,roleId: string): Observable<any> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
      });
  
      return this.http.post(`${this.apiUrl}/SignIn/verify`, { mobile, otp_code,roleId }, { headers });
    }
}
