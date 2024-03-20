import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  PublicHoliday,
  Shift,
  ShiftOption,
} from 'src/app/Core/models/MenuItem';
import { GroupService } from 'src/app/Core/services/group.service';
import { TimesheetService } from 'src/app/Core/services/timesheet.service';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-scheduler-dashboard',
  templateUrl: './scheduler-dashboard.component.html',
  styleUrls: ['./scheduler-dashboard.component.scss'],
})
export class SchedulerDashboardComponent implements OnInit {
  holiday(_t17: Date): any {
    throw new Error('Method not implemented.');
  }
  showDeleteConfirm: boolean = false;
  shiftToDelete: Shift | null = null;
  faPenIcon = faPen;
  faTrashIcon = faTrash;
  editingShift: Shift | null = null;
  currentDate = new Date();
  daysInMonth: Date[] = [];
  filteredData: any[] = [];
  shifts: any[] = [];
  shiftOptions: ShiftOption[] = [
    { name: 'Day Shift', color: '#c1f8fa', time: '07:00 - 19:00' },
    { name: 'Afternoon', color: '#fae1cf', time: '12:00 - 18:00' },
    { name: 'Late Shift', color: '#cfc0ef', time: '14:00 - 23:00' },
    { name: 'Night Shift', color: '#c6def2', time: '19:00 - 07:00' },
  ];
  selectedShift: ShiftOption = this.shiftOptions[0];
  selectedDate: any;
  shiftsByDate: { [date: string]: ShiftOption[] } = {};
  showShiftForm: boolean = false;
  holidays: PublicHoliday[] = [];

  constructor(
    private shiftsService: TimesheetService,
    private gourpService: GroupService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.generateDaysInMonth();
    this.fetchShifts();
    this.loadHolidays();
  }

  generateDaysInMonth(
    year: number = this.currentDate.getFullYear(),
    month: number = this.currentDate.getMonth()
  ): void {
    const numberOfDays = new Date(year, month + 1, 0).getDate();
    this.daysInMonth = [];
    for (let day = 1; day <= numberOfDays; day++) {
      this.daysInMonth.push(new Date(Date.UTC(year, month, day)));
    }
  }

  fetchShifts(): void {
    this.shiftsService.getShifts().subscribe((data) => {
      this.filteredData = data;
      this.shifts = [...this.filteredData];
    });
  }

  loadHolidays(): void {
    this.shiftsService.getPublicHolidays().subscribe(
      (data: PublicHoliday[]) => {
        this.holidays = data;
      },
      (error: any) => {
        console.error('Failed to load holidays:', error);
      }
    );
  }

  nextMonth(): void {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1
    );
    this.generateDaysInMonth();
  }

  previousMonth(): void {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() - 1
    );
    this.generateDaysInMonth();
  }

  getShiftClass(day: Date): string {
    if (this.isWeekend(day) && !this.isHoliday(day)) {
      return '';
    }
    const dateString = day.toISOString().split('T')[0];
    const shift = this.shifts.find((shift) => shift.date === dateString);
    if (shift) {
      switch (shift.shift) {
        case 'Day Shift':
          return 'day-shift';
        case 'Late Shift':
          return 'late-shift';
        case 'Night Shift':
          return 'night-shift';
        case 'Afternoon':
          return 'afternoon-shift';
        default:
          return '';
      }
    }

    const isHoliday = this.holidays.some(
      (holiday) => holiday.date.toString().split('T')[0] === dateString
    );
    if (isHoliday) {
      return 'holiday';
    }

    return '';
  }

  isWeekend(day: Date): boolean {
    return day.getDay() === 0;
  }

  getDaysOfWeek(): string[] {
    const daysOfWeek: string[] = [];
    const startDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      1
    );
    for (let i = 0; i < 7; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      daysOfWeek.push(day.toLocaleDateString('en-US', { weekday: 'short' }));
    }
    return daysOfWeek;
  }

  addShift(shiftName: string, shiftTime: string, selectedDate: string): void {
    const selectedDay = new Date(selectedDate).getDay();
    if (selectedDay === 0 || selectedDay === 6) {
      this.toastr.error('Cannot add shifts on weekends!', 'Error');
      return;
    }
    const existingShift = this.shifts.find(
      (shift) => shift.date === selectedDate
    );

    const existingHoliday = this.holidays.find(
      (holiday) => holiday.date === selectedDate
    );
    if (existingHoliday) {
      this.toastr.error('Cannot add shifts on holidays!', 'Error');
      return;
    }
    if (existingShift) {
      this.toastr.error('Shift already exists for the selected date!', 'Error');
      return;
    }
    this.shiftsService.addShift(shiftName, shiftTime, selectedDate).subscribe(
      (response) => {
        this.fetchShifts();
        this.showShiftForm = false;
        this.toastr.success('Shift added successfully!', 'Success');
      },
      (error) => {
        console.error('Error adding shift:', error);
        this.toastr.error(
          'Failed to add shift. Please try again later.',
          'Error'
        );
      }
    );
  }

  closeShiftForm() {
    this.showShiftForm = false;
    this.editingShift = null;
  }

  editShift(day: Date): void {
    const dateString = day.toISOString().split('T')[0];
    const shift = this.shifts.find((shift) => shift.date === dateString);
    if (shift) {
      this.editingShift = { ...shift };
      this.selectedDate = dateString;
      this.selectedShift =
        this.shiftOptions.find((option) => option.name === shift.shift) ||
        this.shiftOptions[0];
      this.showShiftForm = true;
    } else {
      this.toastr.error('No shift to edit for the selected date!', 'Error');
    }
  }

  updateShift(
    shiftName: string,
    shiftTime: string,
    selectedDate: string
  ): void {
    const shiftId = this.editingShift?.id;
    if (!shiftId) {
      this.toastr.error('Invalid shift details. Please try again.', 'Error');
      return;
    }

    this.shiftsService
      .updateShift(shiftId, shiftName, shiftTime, selectedDate)
      .subscribe(
        (response) => {
          this.fetchShifts();
          this.showShiftForm = false;
          this.editingShift = null;
          this.toastr.success('Shift updated successfully!', 'Success');
        },
        (error) => {
          console.error('Error updating shift:', error);
          this.toastr.error(
            'Failed to update shift. Please try again later.',
            'Error'
          );
        }
      );
  }

  deleteShift(day: Date): void {
    const dateString = day.toISOString().split('T')[0];
    const shift = this.shifts.find((shift) => shift.date === dateString);
    if (shift) {
      this.shiftToDelete = shift;
      this.showDeleteConfirm = true;
    } else {
      this.toastr.error('No shift to delete for the selected date!', 'Error');
    }
  }

  performDelete(): void {
    if (this.shiftToDelete) {
      this.shiftsService.deleteShift(this.shiftToDelete.id).subscribe(
        (response) => {
          this.fetchShifts();
          this.toastr.warning('Shift deleted successfully!', 'Deleted');
        },
        (error) => {
          console.error('Error deleting shift:', error);
          this.toastr.error(
            'Failed to delete shift. Please try again later.',
            'Error'
          );
        }
      );
      this.showDeleteConfirm = false;
      this.shiftToDelete = null;
    }
  }
  cancelDelete(): void {
    this.showDeleteConfirm = false;
    this.shiftToDelete = null;
  }

  isHoliday(day: Date): boolean {
    const dateString = day.toISOString().split('T')[0];
    return this.holidays.some(
      (holiday) => holiday.date.toString().split('T')[0] === dateString
    );
  }

  getHolidayName(day: Date): string {
    const dateString = day.toISOString().split('T')[0];
    const holiday = this.holidays.find(
      (holiday) => holiday.date.toString().split('T')[0] === dateString
    );
    return holiday ? holiday.holidayName : '';
  }
}
