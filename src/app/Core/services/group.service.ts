import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private apiUrl = 'http://localhost:3000/internalData';
private apiUrlTwo ='http://localhost:3000/externalData';
private depAPi='http://localhost:3000/deoartments';


  constructor(private http: HttpClient) {}

  getInternalData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  getExternalData(): Observable<any> {
    return this.http.get<any>(this.apiUrlTwo);
  }

  
  getDepartmentsData(): Observable<any> {
    return this.http.get<any>(this.depAPi);
  }
}