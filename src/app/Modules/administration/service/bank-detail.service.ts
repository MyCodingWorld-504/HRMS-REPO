<<<<<<< HEAD
import { HttpClient, HttpHeaders } from '@angular/common/http';
=======
import { HttpClient } from '@angular/common/http';
>>>>>>> f46a5594cddea03cfaf4f734e9839dd0152f60f4
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankDetailService {

  private apiUrl = 'http://localhost:3001/bank';
<<<<<<< HEAD
  private apiEmp='http://localhost:3000/profiles';
=======
>>>>>>> f46a5594cddea03cfaf4f734e9839dd0152f60f4

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
<<<<<<< HEAD

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
=======
>>>>>>> f46a5594cddea03cfaf4f734e9839dd0152f60f4
}
 