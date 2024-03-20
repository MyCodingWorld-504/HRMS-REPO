import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PayrollService {

  private apiPayslipLables = "http://localhost:3000/payslipLables";
private apiPayslip="http://localhost:3000/payRoll";
private apiShifts ='http://localhost:3000/shifts';
  constructor(private http: HttpClient) { }

  getShifts(): Observable<any> {
    return this.http.get<any>(this.apiShifts);
  }
  getPayslipLables(): Observable<any> {
    return this.http.get<any>(this.apiPayslipLables);
  }
  getPayslip(): Observable<any> {
    return this.http.get<any>(this.apiPayslip);
  }
  getPayslipLablesId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiPayslipLables}/${id}`);
  }
  getEmployeeDetailsById(employeeId: string): Observable<any> {
    return this.http.get(`${this.apiPayslip}?EmployeeID=${employeeId}`);
  }
}
