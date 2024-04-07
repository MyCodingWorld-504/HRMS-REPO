import { Component } from '@angular/core';
import { faArrowsRotate, faEye, faPen, faPlus, faTrash, faX } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ExportToPdfService } from 'src/app/Core/services/export-to-pdf.service';
import { ExportToExcelService } from 'src/app/Core/services/export-to-excel.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-job-title-scheduler-status',
  templateUrl: './job-title-scheduler-status.component.html',
  styleUrls: ['./job-title-scheduler-status.component.scss']
})
export class JobTitleSchedulerStatusComponent {

   
  faXIcon = faX;
  faEyeIcon = faEye;
  faTrashIcon = faTrash;
  faPenIcon = faPen;
  faPlusIcon = faPlus;
  isTooltipVisible = false;
  currentTooltip = '';
  faArrowsRotateIcon = faArrowsRotate;
  empForm!: FormGroup;
  jobs: any[] = [];
  jobsData: any[] = [];
  selectedOption: string;
  searchTerm: string = '';
  page: number = 1;
  itemsPerPageOptions: number[] = [5, 10, 15, 25, 50, 100];
  itemsPerPage: number = this.itemsPerPageOptions[0];


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
 ) {
    this.empForm = this.formBuilder.group({
      searchTerm: [''],
      itemsPerPage: [this.itemsPerPage],
    });
    setTimeout(() => {
      this.empForm.get('itemsPerPage')?.setValue(this.itemsPerPage);
    }, 0);

    this.selectedOption = 'Job Title'; 

  }


 

  protected search() {
    const term = this.empForm.get('searchTerm')?.value;

    if (!term) {
      this.jobsData = [...this.jobs];
      return;
    }

    this.jobsData = this.jobs.filter((group) => this.searchInGroup(group, term));
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
    return endIndex > this.jobsData.length
      ? this.jobsData.length
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

  onSelectChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.selectedOption = selectedValue;
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


  OnRouteDashboard(){
    this.router.navigate(['dashboard', 'recuirtment', 'recuirtment-dashboard']);
  }

  openDeleteConfirmation(arg0: any) {
    throw new Error('Method not implemented.');
    }
    onDeleteConfirmed(arg0: any) {
    throw new Error('Method not implemented.');
    }
    onCancelDelete() {
    throw new Error('Method not implemented.');
    }  
    submitForm() {
      throw new Error('Method not implemented.');
    }


}
