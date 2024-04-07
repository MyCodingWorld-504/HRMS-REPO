import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { faEye , faArrowsRotate, faPen, faTrash, faPlus} from '@fortawesome/free-solid-svg-icons';
import { BankDetailService } from '../../service/bank-detail.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ExportToPdfService } from 'src/app/Core/services/export-to-pdf.service';
import { ExportToExcelService } from 'src/app/Core/services/export-to-excel.service';
import { ConfirmDeletePopupComponent } from '../../confirm-delete-popup/confirm-delete-popup.component';



@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.scss']
})
export class BankDetailsComponent implements OnInit, OnDestroy{
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
  page: number = 1;
  itemsPerPageOptions: number[] = [5, 10, 15, 25, 50, 100];
  itemsPerPage: number = this.itemsPerPageOptions[0];
  groupForm: FormGroup;
  showAddBankDetailsForm = false;
  showConfirmModal = false;
  idToDelete: number | null = null;

  private groupSubscription: Subscription | undefined;

  constructor(
    private bankService : BankDetailService,
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
    this.fetchGroups();
  }

  ngOnDestroy(): void {
    if (this.groupSubscription) {
      this.groupSubscription.unsubscribe();
    }
  }

  fetchGroups() {
    this.groupSubscription = this.bankService.getAll().subscribe({
      next: (data: any) => {
        this.groups = data;
        this.filteredGroups = [...this.groups];
      },
      error: (error) => {
        console.error('Error fetching groups:', error);
      },
    });
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
  submitForm() {
    throw new Error('Method not implemented.');
  }

  onView(id : number) {
    this.router.navigate(['dashboard', 'administration', 'view-bank-details',id]);

      }
  onEdit(id : number) {
    this.router.navigate(['dashboard', 'administration', 'edit-bank-details',id]);

      }
    onAdd() {
      this.router.navigate(['dashboard', 'administration', 'add-bank-details']);
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

        this.bankService.deleteEntryById(id).subscribe(() => {
          this.toastr.warning('Record deleted successfully', 'Delete');
          this.fetchGroups();
        });
      }
    }

    onCancelDelete() {
      this.showDeleteConfirmation = false;
      this.deleteConfirmationId = null;
    }

    exportToPDF(): void {
      const selectedColumns = ['Empname', 'bankname', 'branch','accountNo','branch','ifsc','panno','address',];
      this.exportPdfService.exportTableToPDF( this.filteredGroups, selectedColumns);
      this.toastr.success('PDF Exported Successfully', 'Success')
    }
    exportToExcel() {
      const columns = ['Empname', 'bankname', 'branch','accountNo','branch','ifsc','panno','address',];
      this.excelService.exportAsExcelFile(this.filteredGroups, 'Sky-HR_', columns);
      this.toastr.success('EXCEl Exported Successfully', 'Success')
    }

    OnRouteDashboard(){
      this.router.navigate(['dashboard', 'administration', 'admin-dashboard']);
    }
}
