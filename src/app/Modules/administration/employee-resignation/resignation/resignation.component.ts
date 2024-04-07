import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import {
  faEye,
  faArrowsRotate,
  faTrash,
  faPen,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { GroupService } from 'src/app/Core/services/group.service';
import { ToastrService } from 'ngx-toastr';
import { ExportToPdfService } from 'src/app/Core/services/export-to-pdf.service';
import { ExportToExcelService } from 'src/app/Core/services/export-to-excel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resignation',
  templateUrl: './resignation.component.html',
  styleUrls: ['./resignation.component.scss']
})
export class ResignationComponent {
submitInternalForm() {
throw new Error('Method not implemented.');
}

  faArrowsRotateIcon = faArrowsRotate;
  faEyeIcon = faEye;
  faTrashIcon = faTrash;
  faPenIcon = faPen;
  faPlusIcon =faPlus;
  isTooltipVisible = false;
  currentTooltip = '';
  itemsPerPageSelect: any;
  empForm : FormGroup ;
  resignation: any[] = [];
  resignationData: any[] = [];
  searchTerm: string = '';
  page: number = 1;
  itemsPerPageOptionsResignationPage: number[] = [5, 10, 15, 25, 50, 100];
  itemsPerPageResignationPage: number = this.itemsPerPageOptionsResignationPage[0];



  private groupSubscription: Subscription | undefined;


  constructor(
    private groupService: GroupService,
    private formBuilder: FormBuilder,
    private router : Router,
    private toastr: ToastrService,
    private exportPdfService : ExportToPdfService,
    private excelService : ExportToExcelService
  ) {
    this.empForm = this.formBuilder.group({
      searchTerm: [''],
      itemsPerPageInternal: [this.itemsPerPageResignationPage],
      pageInternal: [this.page],
    });

  }


  ngOnInit(): void {
    this.fetchResignationData();
  }

  ngOnDestroy(): void {
    if (this.groupSubscription) {
      this.groupSubscription.unsubscribe();
    }
  }

  fetchResignationData() {
    this.groupSubscription = this.groupService.getResignedEmp().subscribe({
      next: (data: any) => {
        this.resignation = data;
        this.resignationData = [...this.resignation];
      },
      error: (error) => {
        console.error('Error fetching groups:', error);
      },
    });
  }

  protected search() {
    const term = this.empForm.get('searchTerm')?.value;

    if (!term) {
      this.resignationData = [...this.resignation];
      return;
    }

    this.resignationData = this.resignation.filter((group) => this.searchInGroup(group, term));
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
    this.empForm.get('searchTerm')?.setValue('');
    this.search();
    this.page = 1;

  }

  onItemsPerPageChangeResignation(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.itemsPerPageResignationPage = parseInt(target.value);
    this.page = 1;
  }


  pageChangedResignation(event: number) {
    this.page = event;
  }


  getStartIndexResignation(): number {
    return (this.page - 1) * this.itemsPerPageResignationPage + 1;
  }

  getEndIndexResignation(): number {
    const endIndex = this.page * this.itemsPerPageResignationPage;
    return endIndex > this.resignationData.length ? this.resignationData.length : endIndex;
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
  submitForm() {
    throw new Error('Method not implemented.');
  }

  onAdd() {
    this.router.navigate(['dashboard', 'administration', 'add-resignation']);
  }

  onEdit(id : number) {
    this.router.navigate(['dashboard', 'administration', 'edit-resignation',id]);
  }

  onView(id : number) {
    this.router.navigate(['dashboard', 'administration', 'view-resignation',id]);
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

      this.groupService.deleteResignation(id).subscribe(() => {
        this.toastr.warning('Record deleted successfully', 'Delete');
        this.fetchResignationData();
      });
    }
  }

  onCancelDelete() {
    this.showDeleteConfirmation = false;
    this.deleteConfirmationId = null;
  }

  exportToPDF(): void {
    const selectedColumns = ['id', 'empName', 'resignationSubmittedDate','lastWorkingDay','statusOfResignation','approvedManager','reasonForResignation'];
    this.exportPdfService.exportTableToPDF( this.resignationData, selectedColumns);
    this.toastr.success('PDF Exported Successfully', 'Success')
  }
  exportToExcel() {
    const columns = ['id', 'empName', 'resignationSubmittedDate','lastWorkingDay','statusOfResignation','approvedManager','reasonForResignation'];
    this.excelService.exportAsExcelFile(this.resignationData, 'Sky-HR_', columns);
    this.toastr.success('EXCEl Exported Successfully', 'Success')
  }
  OnRouteDashboard(){
    this.router.navigate(['dashboard', 'administration', 'admin-dashboard']);
  }
}
