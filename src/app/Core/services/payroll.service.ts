import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PayrollService {

  private apiPayslipLables = "http://localhost:3000/payslipLables";
private apiPayslip="http://localhost:3000/payRoll";
  constructor(private http: HttpClient) { }

  getPayslipLables(): Observable<any> {
    return this.http.get<any>(this.apiPayslipLables);
  }
  getPayslip(): Observable<any> {
    return this.http.get<any>(this.apiPayslip);
  }
  getPayslipLablesId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiPayslipLables}/${id}`);
  }

}
