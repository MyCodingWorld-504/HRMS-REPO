import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { faX, faEye, faTrash, faPen, faPlus, faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { ExportToExcelService } from 'src/app/Core/services/export-to-excel.service';
import { RecuirtmentService } from 'src/app/Core/services/recuirtment.service';

@Component({
  selector: 'app-open-positions',
  templateUrl: './open-positions.component.html',
  styleUrls: ['./open-positions.component.scss']
})
export class OpenPositionsComponent {


  clients: any[]=[];
  filteredClients: any[]= [];
  fromDate!: Date;
  toDate!: Date;
  faXIcon = faX;
  faEyeIcon = faEye;
  faTrashIcon = faTrash;
  faPenIcon = faPen;
  faPlusIcon = faPlus;
  isTooltipVisible = false;
  currentTooltip = '';
  faArrowsRotateIcon = faArrowsRotate;
  empForm!: FormGroup;
  searchTerm: string = '';
  page: number = 1;
  itemsPerPageOptions: number[] = [5, 10, 15, 25, 50, 100];
  itemsPerPage: number = this.itemsPerPageOptions[0];
  showTable: boolean = false;
  exportForm! :FormGroup ;
  exportColumns: any = {};
  selectedColumns: string[] = [];
  clientForm! : FormGroup;
  clientData: any []=[];
  showOverlay: boolean = false;
  client: any ;

  constructor(private excel:ExportToExcelService,
    private fb: FormBuilder,
    private toastr:ToastrService,
    private recruitmentService:RecuirtmentService,
    private router:Router) {
      this.clientForm = this.fb.group({
        searchTerm: [''],
        itemsPerPage: [this.itemsPerPage],
      });
      setTimeout(() => {
        this.clientForm.get('itemsPerPage')?.setValue(this.itemsPerPage);
      }, 0);


      this.exportForm = this.fb.group({
        name: true,
        email: false
      });


     }

     ngOnInit(): void {
      this.fetchClients(); 
    }
 

    
    fetchClients(): void {
      this.recruitmentService.getPositions().subscribe(
        clients => {
          this.clients = clients;
          this.filteredClients = [...this.clients];
        },
        error => {
          console.error('Error fetching clients:', error);
        }
      );
    }

  protected search() { 
    const term = this.clientForm.get('searchTerm')?.value;
  
    if (!term) {
      this.filteredClients = [...this.clients];
      return;
    }
  
    this.filteredClients = this.clients.filter((group) => this.searchInGroup(group, term));
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
    return endIndex > this.clientData.length
      ? this.clientData.length
      : endIndex;
  }
  
  onRefresh() {
    this.clientForm.get('searchTerm')?.setValue('');
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
  
  
  openOverlay() {
   this.showOverlay = true;
  }

  closeOverlay() {
    this.showOverlay = false;
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
