import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bank } from 'src/app/Core/models/MenuItem';

@Injectable({
  providedIn: 'root'
})
export class BankDetailService {

  private apiUrl = 'http://localhost:3001/bank';
  private apiEmp='http://localhost:3000/profiles';
private apiList='http://localhost:3000/list';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getEmployeeProfiles(): Observable<any[]> {
    return this.http.get<any[]>(this.apiEmp);
  }

  getBankDetailsById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateBankDetails(details: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${details.id}`, details);
  }
  addNewBankEntry(newEntry: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, newEntry);
  }
  deleteEntryById(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

}
