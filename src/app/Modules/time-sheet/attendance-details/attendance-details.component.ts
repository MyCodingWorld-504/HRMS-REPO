import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faArrowsRotate, faEye, faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { ExportToExcelService } from 'src/app/Core/services/export-to-excel.service';
import { ExportToPdfService } from 'src/app/Core/services/export-to-pdf.service';
import { TimesheetService } from 'src/app/Core/services/timesheet.service';

interface ShiftOption {
  name: string;
  color: string;
}


@Component({
  selector: 'app-attendance-details',
  templateUrl: './attendance-details.component.html',
  styleUrls: ['./attendance-details.component.scss']
})
export class AttendanceDetailsComponent {

  attendanceDetails: any[] = [];
  page: number = 1;
  itemsPerPageOptions: number[] = [5, 10, 15, 25, 50, 100];
  itemsPerPage: number = this.itemsPerPageOptions[0];
  groupForm: FormGroup;
  faArrowsRotateIcon = faArrowsRotate;
  faEyeIcon = faEye;
  faPlusIcon =faPlus;
  faTrashIcon = faTrash;
  faPenIcon = faPen;
  isTooltipVisible = false;
  currentTooltip = '';
  itemsPerPageSelect: any;
  groups: any[] = [];
  filteredGroups: any[] = [];
  searchTerm: string = '';
  attendanceData: any[] = [];
  employeeData: any;

  shiftsArray: { day: string; number: string }[] = [];

  shiftOptions: ShiftOption[] = [
    { name: 'PP', color: '#c1f8fa' },
    { name: 'AA', color: '#fae1cf' },
    { name: 'WO', color: '#cfc0ef' },
    { name: 'HO', color: '#c6def2' },
  ]; 


  constructor(
    private timesheetService : TimesheetService,
    private formBuilder: FormBuilder,
    private router : Router,
    private toastr : ToastrService,
    private exportPdfService : ExportToPdfService,
    private excelService : ExportToExcelService,

  ) {
    this.groupForm = this.formBuilder.group({
      searchTerm: [''],
      itemsPerPage: [this.itemsPerPage],
    });
    setTimeout(() => {
      this.groupForm.get('itemsPerPage')?.setValue(this.itemsPerPage);
    }, 0);

  
  }

  ngOnInit(): void {
    this.fetchAttendance();

    for (let i = 1; i <= 31; i++) {
      this.shiftsArray.push({ day: `Day ${i}`, number: i.toString() });
    }
  }
  

  fetchAttendance(): void {
    this.timesheetService.getAllAttendance().subscribe(
      (data: any) => {
        this.attendanceDetails = data;
        this.toastr.success('Attendance data fetched successfully', 'Success');
      },
      (error) => {
        console.error('Error fetching attendance data:', error);
        this.toastr.error('Failed to fetch attendance data', 'Error');
      }
    );
  }

  
  getShiftColor(shift: string): string {
    const matchedShift = this.shiftOptions.find(option => option.name === shift);
    return matchedShift ? matchedShift.color : '';
  }

  getShiftClass(shift: string): string {
    switch (shift) {
      case 'PP':
        return 'shift-pp';
      case 'AA':
        return 'shift-aa';
      case 'WO':
        return 'shift-wo';
      case 'HO':
        return 'shift-ho';
      default:
        return '';
    }
  }

  exportToPDF(): void {
    const selectedColumns = ['Emp Name', 'Department', 'D.O.J', 'Category', 'Shifts', 'DAYS PRESENT', 'WO', 'HO', 'Absent (LOP)', 'DAYS PAYABLE', 'OT HR\'S', 'Bus', 'Remarks'];
    this.exportPdfService.exportTableToPDF(this.attendanceDetails, selectedColumns);
    this.toastr.success('PDF Exported Successfully', 'Success');
  }
  
  exportToExcel() {
    const columns = ['Emp Name', 'Department', 'D.O.J', 'Category', 'Shifts', 'DAYS PRESENT', 'WO', 'HO', 'Absent (LOP)', 'DAYS PAYABLE', 'OT HR\'S', 'Bus', 'Remarks'];
    this.excelService.exportAsExcelFile(this.attendanceDetails, 'Attendance_', columns);
    this.toastr.success('Excel Exported Successfully', 'Success');
  }

  
  onItemsPerPageChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.itemsPerPage = parseInt(target.value);
    this.page = 1;
  }

  pageChanged(event: number) {
    this.page = event;
  }

  getStartIndex(): number {
    return (this.page - 1) * this.itemsPerPage + 1;
  }

  getEndIndex(): number {
    const endIndex = this.page * this.itemsPerPage;
    return endIndex > this.filteredGroups.length
      ? this.filteredGroups.length
      : endIndex;
  }

  protected search() {
    const term = this.groupForm.get('searchTerm')?.value;

    if (!term) {
      this.filteredGroups = [...this.groups];
      return;
    }

    this.filteredGroups = this.groups.filter((group) => this.searchInGroup(group, term));
  }


  private searchInGroup(group: any, term: string): boolean {
    for (const key in group) {
      if (group.hasOwnProperty(key)) {
        const value = group[key];
        if (
          value !== null &&
          typeof value !== 'object' &&
          String(value).toLowerCase().includes(term.toLowerCase())
        ) {
          return true;
        }
      }
    }
    return false;
  }

  onRefresh() {
    this.groupForm.get('searchTerm')?.setValue('');
    this.search();
    this.page = 1;

  }
  showTooltip(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    const tooltip = target.querySelector('.tooltip') as HTMLElement;
    if (tooltip) {
      tooltip.style.opacity = '1';
      tooltip.style.visibility = 'visible';
    }
  }

  hideTooltip(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    const tooltip = target.querySelector('.tooltip') as HTMLElement;
    if (tooltip) {
      tooltip.style.opacity = '0';
      tooltip.style.visibility = 'hidden';
    }
  }

  showTooltipIcon(tooltip: string, event: MouseEvent): void {
    this.currentTooltip = tooltip;
    this.isTooltipVisible = true;

    const targetElement = event.currentTarget as HTMLElement;
    const boundingRect = targetElement.getBoundingClientRect();
    const tooltipElement = targetElement.querySelector('.tooltip') as HTMLElement;

    if (tooltipElement) {
      tooltipElement.style.top = `${boundingRect.top - tooltipElement.clientHeight}px`;
      tooltipElement.style.left = `${boundingRect.left + boundingRect.width / 2 - tooltipElement.clientWidth / 2}px`;
    }
  }

  hideTooltipIcon(): void {
    this.isTooltipVisible = false;
  }


  onAdd() {
    throw new Error('Method not implemented.');
    }

    OnRouteDashboard(){
      this.router.navigate(['dashboard', 'timesheet', 'timesheetDashboard']);
    }
  

}
