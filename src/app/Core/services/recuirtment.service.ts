import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecuirtmentService {

  constructor(private http: HttpClient) { }

  private candidateApi =' http://localhost:3000/candidates';
  private positionsApi ='http://localhost:3000/positions';
  private statusApi ='http://localhost:3000/candidatesStatus';

  getCandidates(): Observable<any> {
    return this.http.get<any>(this.candidateApi);
  }

  getCandidateById(id: string): Observable<any> {
    return this.http.get<any>(`${this.candidateApi}/${id}`);
  }


  getPositions(): Observable<any>{
     return this.http.get<any>(this.positionsApi);
  }



  getSceduledStatus(): Observable<any>{
    return this.http.get<any>(this.statusApi);
  }

  addNewCandidateProfiles(newEntry: any): Observable<any> {
    return this.http.post<any>(this.candidateApi, newEntry);
  }

  addNewCandidateSchedule(newEntry: any): Observable<any> {
    return this.http.post<any>(this.statusApi, newEntry);
  }

}
