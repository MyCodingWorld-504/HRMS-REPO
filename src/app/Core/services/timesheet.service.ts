import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PublicHoliday } from '../models/MenuItem';

@Injectable({
  providedIn: 'root',
})
export class TimesheetService {
  private apiShifts = 'http://localhost:3000/shifts';
  private apiLeave = 'http://localhost:3000/leaveOptions';
  private apiHoliday = 'http://localhost:3000/publicHolidays';
  private apiAttendace = 'http://localhost:3000/attendance';


  constructor(private http: HttpClient) {}

  getLeaves(): Observable<any> {
    return this.http.get<any>(this.apiLeave);
  }
  getShifts(): Observable<any> {
    return this.http.get<any>(this.apiShifts);
  }
  addLeave(leaveLabel: string, selectedDate: string): Observable<any> {
    const leaveData = {
      label: leaveLabel,
      date: selectedDate,
    };
    return this.http.post<any>(this.apiLeave, leaveData);
  }

  addShift(
    shiftName: string,
    shiftTime: string,
    selectedDate: string
  ): Observable<any> {
    const shift = {
      shift: shiftName,
      time: shiftTime,
      date: selectedDate,
    };

    return this.http.post<any>(this.apiShifts, shift);
  }
  updateShift(id: string, shiftName: string, shiftTime: string, date: string) {
    const body = { shift: shiftName, time: shiftTime, date: date };
    return this.http.put(`${this.apiShifts}/${id}`, body);
  }


deleteShift(shiftId: number): Observable<any> {
  const url = `${this.apiShifts}/${shiftId}`;
  return this.http.delete(url);
}

// In group.service.ts (or a relevant service file)
// In your service where you fetch public holidays
// getPublicHolidays(): Observable<PublicHoliday[]> {
//   return this.http.get<PublicHoliday[]>(this.apiHoliday).pipe(
//     map(holidays => holidays.map(holiday => ({
//       ...holiday,
//       date: new Date(holiday.date) // Convert string to Date object if necessary for the component
//     })))
//   );
// }

getPublicHolidays(): Observable<PublicHoliday[]> {
  return this.http.get<PublicHoliday[]>(this.apiHoliday);
}

getAllAttendance(): Observable<any[]> {
  return this.http.get<any[]>(this.apiAttendace);
}
 
}
