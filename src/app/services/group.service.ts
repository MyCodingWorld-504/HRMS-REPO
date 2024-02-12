import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private apiUrl = 'https://gorest.co.in/public/v2/users';

  constructor(private http: HttpClient) {}

  getGroups(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
