import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankDetailService {

  private apiUrl = 'http://localhost:3001/bank';
  private apiEmp='http://localhost:3000/profiles';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getEmployeeProfiles(): Observable<any[]> {
    return this.http.get<any[]>(this.apiEmp);
  }

  addEmployee(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    
    return this.http.post<any>(`${this.apiEmp}/employees`,  httpOptions);
  }
}
 