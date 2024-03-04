import { Component } from '@angular/core';
import { BankDetailService } from '../../service/bank-detail.service';
import { faArrowsRotate, faEye, faPen, faPlus, faTrash, faX } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ExportToPdfService } from 'src/app/Core/services/export-to-pdf.service';
import { ExportToExcelService } from 'src/app/Core/services/export-to-excel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-profiles',
  templateUrl: './employee-profiles.component.html',
  styleUrls: ['./employee-profiles.component.scss']
})
export class EmployeeProfilesComponent {
  group: any;
  submitForm() {
    throw new Error('Method not implemented.');
  }
  faXIcon = faX;
  faEyeIcon = faEye;
  faTrashIcon = faTrash;
  faPenIcon = faPen;
  faPlusIcon = faPlus;
  isTooltipVisible = false;
  currentTooltip = '';
  faArrowsRotateIcon = faArrowsRotate;
  empForm!: FormGroup;
  employeeProfiles: any[] = [];
  employeeData: any[] = [];
  searchTerm: string = '';
  page: number = 1;
  itemsPerPageOptions: number[] = [5, 10, 15, 25, 50, 100];
  itemsPerPage: number = this.itemsPerPageOptions[0];


  constructor(private profileService: BankDetailService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private exportPdfService: ExportToPdfService,
    private excelService: ExportToExcelService) {
    this.empForm = this.formBuilder.group({
      searchTerm: [''],
      itemsPerPage: [this.itemsPerPage],
    });
    setTimeout(() => {
      this.empForm.get('itemsPerPage')?.setValue(this.itemsPerPage);
    }, 0);

  }


  ngOnInit(): void {
    this.fetchEmployeeProfiles();
  }

  fetchEmployeeProfiles() {
    this.profileService.getEmployeeProfiles().subscribe({
      next: (data: any) => {
        this.employeeProfiles = data;
        this.employeeData = [...this.employeeProfiles];
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  protected search() {
    const term = this.empForm.get('searchTerm')?.value;

    if (!term) {
      this.employeeData = [...this.employeeProfiles];
      return;
    }

    this.employeeData = this.employeeProfiles.filter((group) => this.searchInGroup(group, term));
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
    return endIndex > this.employeeData.length
      ? this.employeeData.length
      : endIndex;
  }

  onRefresh() {
    this.empForm.get('searchTerm')?.setValue('');
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
    const tooltipElement = targetElement.querySelector(
      '.tooltip'
    ) as HTMLElement;

    if (tooltipElement) {
      tooltipElement.style.top = `${
        boundingRect.top - tooltipElement.clientHeight
      }px`;
      tooltipElement.style.left = `${
        boundingRect.left +
        boundingRect.width / 2 -
        tooltipElement.clientWidth / 2
      }px`;
    }
  }

  hideTooltipIcon(): void {
    this.isTooltipVisible = false;
  }




  onEdit(id: number) {
    this.router.navigate(['dashboard', 'administration', 'edit-emp-profile', id]);

  }

  onView(id: number) {
    this.router.navigate(['dashboard', 'administration', 'view-emp-profile', id]);

  }


  onAdd() {
    this.router.navigate(['dashboard', 'administration', 'add-emp-details']);
  }



  showDeleteConfirmation = false;
  deleteConfirmationId: number | null = null;


  openDeleteConfirmation(id: number) {
    this.showDeleteConfirmation = true;
    this.deleteConfirmationId = id;
  }

  onDeleteConfirmed(id: number | null) {
    if (id !== null) {
      this.showDeleteConfirmation = false;

      this.profileService.deleteEmployeeProfiles(id).subscribe(() => {
        this.toastr.warning('Record deleted successfully', 'Delete');
        this.fetchEmployeeProfiles();
      });
    }
  }

  onCancelDelete() {
    this.showDeleteConfirmation = false;
    this.deleteConfirmationId = null;
  }


  exportToPDF(): void {
    const selectedColumns = ['id', 'employeeName', 'department', 'designation', 'phoneNumber', 'email', 'workingLocation', 'workingClient', 'permanentAddress'];
    this.exportPdfService.exportTableToPDF(this.employeeData, selectedColumns);
    this.toastr.success('PDF Exported Successfully', 'Success')
  }
  exportToExcel() {
    const columns = ['id', 'employeeName', 'department', 'designation', 'phoneNumber', 'email', 'workingLocation', 'workingClient', 'permanentAddress'];
    this.excelService.exportAsExcelFile(this.employeeData, 'Sky-HR_', columns);
    this.toastr.success('EXCEl Exported Successfully', 'Success')
  }


}



