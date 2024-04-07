import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'http://localhost:3000/user';
  private baseUrl: string = 'https://localhost:7058/api/User/';
  private userPayload:any;
  constructor(private http: HttpClient, private router: Router) {}


  getAll() {
    return this.http.get(this.apiUrl);
  }
  RegisterUser(inputdata: any): Observable<any> {
    return this.http.post(this.apiUrl, inputdata)
  }
  getByCode(code: any): Observable<any> {
    return this.http.get(this.apiUrl + '/' + code);
  }

  proceedRegister(inputData: any): Observable<any> {
    return this.http.post(this.apiUrl, inputData);
  }


  updateUser(data: any, inputData: any): Observable<any> {
    return this.http.put(this.apiUrl + '/' + data, inputData);
  }
  logout(){
    sessionStorage.removeItem('username');
this.router.navigate(['/navbar']);
  }
  isLoggedIn(): boolean {
    return sessionStorage.getItem('username')? true: false;
  }
  getUserRole() {
    return sessionStorage.getItem('userRole') != null ? sessionStorage.getItem('userRole')?.toString() : null;
  }

 }
