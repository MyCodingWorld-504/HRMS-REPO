import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BankDetailService {

  private apiUrl = 'http://localhost:3000/bank';
  private apiEmp='http://localhost:3000/profiles';
  private apiList='http://localhost:3000/list';
  private apiRoles='http://localhost:3000/Roles';
  private apiAdminMenu='http://localhost:3000/menu';
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getEmployeeProfiles(): Observable<any[]> {
    return this.http.get<any>(this.apiEmp);
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
  getEmployeeProfileById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiEmp}/${id}`);
  }
  updateEmployeeProfiles(details: any): Observable<any> {
    return this.http.put<any>(`${this.apiEmp}/${details.id}`, details);
  }
  addNewEmployeeProfiles(newEntry: any): Observable<any> {
    return this.http.post<any>(this.apiEmp, newEntry);
  }
  deleteEmployeeProfiles(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiEmp}/${id}`);

}

  getAllRoles(): Observable<any> {
    return this.http.get<any>(this.apiRoles);
  }
  addRole(roleName: string): Observable<any> {
    const data = { name: roleName };
    return this.http.post(this.apiRoles, data);
  }

  deleteRoleById(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiRoles}/${id}`);
  }

  updateEmployeeRoles(details: any): Observable<any> {
    return this.http.put<any>(`${this.apiRoles}/${details.id}`, details);
  }

  getEmployeeRolesById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiRoles}/${id}`);
  }

  getAdmin(): Observable<any> {
    return this.http.get<any>(this.apiAdminMenu);
  }


}
