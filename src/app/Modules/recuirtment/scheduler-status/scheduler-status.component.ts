import { Component, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { faX, faEye, faTrash, faPen, faPlus, faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { ExportToExcelService } from 'src/app/Core/services/export-to-excel.service';
import { RecuirtmentService } from 'src/app/Core/services/recuirtment.service';
import { SharedService } from 'src/app/Core/services/shared.service';

@Component({
  selector: 'app-scheduler-status',
  templateUrl: './scheduler-status.component.html',
  styleUrls: ['./scheduler-status.component.scss']
})
export class SchedulerStatusComponent {

  
  candidates: any[]=[];
  filteredcandidates: any[]= [];
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
 
  exportColumns: any = {};
  selectedColumns: string[] = [];
  candidateForm! : FormGroup;
  candidateData: any []=[];
  showOverlay: boolean = false;
  candidate: any ;


  defaultStatusOptions = [
    "Submitted",
    "Profile Selected",
    "Screen Rejected",
    "Feedback Pending (FB Pending)",
    "Level 1 (L1) Scheduled",
    "Level 1 (L1) Shortlisted",
    "Level 1 (L1) Rejected",
    "Level 1 (L1) Feedback Pending",
    "Level 1 (L1) No-Show",
    "Level 2 (L2) Scheduled",
    "Level 2 (L2) Shortlisted",
    "Level 2 (L2) Rejected",
    "Level 2 (L2) Feedback Pending",
    "Level 2 (L2) No-Show",
    "HR Scheduled",
    "HR Shortlisted",
    "Offered",
    "Accepted",
    "Declined",
    "No-Show",
    "Joined",
    "On Progress"
  ];




  menuItems: { id: string; label: string; checked: boolean; customHeader?: string }[] = [
    {
      id: '1',
      label: 'Full Name',
      checked: false,
      customHeader: 'Full Name'
    },
    {
      id: '2',
      label: 'Email ID',
      checked: false,
      customHeader: 'Email ID'
    },
    {
      id: '3',
      label: 'Phone No',
      checked: false,
      customHeader: 'Phone No'
    },
    {
      id: '4',
      label: 'Alternative Phone No',
      checked: false,
      customHeader: 'Alternative Phone No'
    },
    {
      id: '5',
      label: 'Alternative Email ID',
      checked: false,
      customHeader: 'Alternative Email ID'
    },
    {
      id: '6',
      label: 'Technologies',
      checked: false,
      customHeader: 'Technologies'
    },
    {
      id: '7',
      label: 'Sub Skills',
      checked: false,
      customHeader: 'Sub Skills'
    },
    {
      id: '8',
      label: 'Pan No',
      checked: false,
      customHeader: 'Pan No'
    },
    {
      id: '9',
      label: 'Aadhar No',
      checked: false,
      customHeader: 'Aadhar No'
    },
    {
      id: '10',
      label: 'Passport No',
      checked: false,
      customHeader: 'Passport No'
    },
    {
      id: '11',
      label: 'PF No',
      checked: false,
      customHeader: 'PF No'
    },
    {
      id: '12',
      label: 'Current CTC',
      checked: false,
      customHeader: 'Current CTC'
    },
    {
      id: '13',
      label: 'Expected CTC',
      checked: false,
      customHeader: 'Expected CTC'
    },
    {
      id: '14',
      label: 'No of Years Experience',
      checked: false,
      customHeader: 'No of Years Experience'
    },
    {
      id: '15',
      label: 'Relavant Experience',
      checked: false,
      customHeader: 'Relavant Experience'
    },
    {
      id: '16',
      label: 'Notice Period',
      checked: false,
      customHeader: 'Notice Period'
    },
    {
      id: '17',
      label: 'Date of Birth',
      checked: false,
      customHeader: 'Date of Birth'
    },
    {
      id: '18',
      label: 'Willing to Relocate',
      checked: false,
      customHeader: 'Willing to Relocate'
    },
    {
      id: '19',
      label: 'Current Location',
      checked: false,
      customHeader: 'Current Location'
    },
    {
      id: '20',
      label: 'Working Location',
      checked: false,
      customHeader: 'Working Location'
    },
    {
      id: '21',
      label: 'Current Designation',
      checked: false,
      customHeader: 'Current Designation'
    },
    {
      id: '22',
      label: 'Current Organization',
      checked: false,
      customHeader: 'Current Organization'
    },
    {
      id: '23',
      label: 'Previous Organization',
      checked: false,
      customHeader: 'Previous Organization'
    },
    {
      id: '24',
      label: 'Highest Degree',
      checked: false,
      customHeader: 'Highest Degree'
    },
    {
      id: '25',
      label: 'Year of Passed Out',
      checked: false,
      customHeader: 'Year of Passed Out'
    },
    {
      id: '26',
      label: 'University/College',
      checked: false,
      customHeader: 'University/College'
    },
    {
      id: '27',
      label: 'University Percentage',
      checked: false,
      customHeader: 'University Percentage'
    },
    {
      id: '28',
      label: 'Reason of Change',
      checked: false,
      customHeader: 'Reason of Change'
    },
    {
      id: '29',
      label: 'Submitted Date',
      checked: false,
      customHeader: 'Submitted Date'
    },
    {
      id: '30',
      label: 'Profile Attachment',
      checked: false,
      customHeader: 'Profile Attachment'
    },
    {
      id: '31',
      label: 'Date',
      checked: false,
      customHeader: 'Date'
    },
    {
      id: '32',
      label: 'Day',
      checked: false,
      customHeader: 'Day'
    },
    {
      id: '33',
      label: 'Time',
      checked: false,
      customHeader: 'Time'
    },
    {
      id: '34',
      label: 'Mode of Interview',
      checked: false,
      customHeader: 'Mode of Interview'
    },
    {
      id: '35',
      label: 'Status',
      checked: false,
      customHeader: 'Status'
    },
    {
      id: '36',
      label: 'Recruiter Name',
      checked: false,
      customHeader: 'Recruiter Name'
    },
    {
      id: '37',
      label: 'Client Name',
      checked: false,
      customHeader: 'Client Name'
    },
    {
      id: '38',
      label: 'Remarks',
      checked: false,
      customHeader: 'Remarks'
    },
    {
      id: '39',
      label: 'Action',
      checked: false,
      customHeader: 'Action'
    }
  ];
  
  
  selectedMenuItems: { id: string; label: string; checked: boolean; customHeader?: string  }[] = [];


  constructor(private excel:ExportToExcelService,
    private fb: FormBuilder,
    private sharedService: SharedService,
    private toastr:ToastrService,
    private recruitmentService:RecuirtmentService,
    private router:Router,
    private renderer: Renderer2) {
      this.candidateForm = this.fb.group({
        searchTerm: [''],
        itemsPerPage: [this.itemsPerPage],
      });
      setTimeout(() => {
        this.candidateForm.get('itemsPerPage')?.setValue(this.itemsPerPage);
      }, 0);
     }

     ngOnInit(): void {
      this.fetchcandidates(); 
      this.initializeForm();
      this.fetchMenuItems();
      this.loadTableState();

    }
 
    initializeForm() {
      this.candidateForm = this.fb.group({
        searchTerm: [''],
        status: [''] 
      });
    }
    
    fetchcandidates(): void {
      this.recruitmentService. getSceduledStatus().subscribe(
        candidates => {
          this.candidates = candidates;
          this.filteredcandidates = [...this.candidates];
          this.sharedService.getFormData().subscribe(formData => {
          });
        },
        error => {
          console.error('Error fetching candidates:', error);
        }
      );
    }

  protected search() { 
    const term = this.candidateForm.get('searchTerm')?.value;
  
    if (!term) {
      this.filteredcandidates = [...this.candidates];
      return;
    }
  
    this.filteredcandidates = this.candidates.filter((group) => this.searchInGroup(group, term));
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
    return endIndex > this.candidateData.length
      ? this.candidateData.length
      : endIndex;
  }
  
  onRefresh() {
    this.candidateForm.get('searchTerm')?.setValue('');
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

  openTableCustomizationOverlay() {
    const offcanvas = document.getElementById('tableCustomizationOverlay'); // Get the offcanvas element
    if (offcanvas) {
      this.renderer.addClass(offcanvas, 'show'); // Add 'show' class to display the offcanvas
    }
  }

  fetchMenuItems() {

    if (!localStorage.getItem('selectedMenuItems')) {
      this.menuItems.forEach((item) => (item.checked = true));
      this.selectedMenuItems = [...this.menuItems];
    }

    this.menuItems = this.menuItems.map((item) => {
      const isSelected = this.selectedMenuItems.some((selectedItem) => selectedItem.id === item.id);
      return { ...item, checked: isSelected };
    });
  }

  generateTable() {
    this.selectedMenuItems = this.menuItems.filter((item) => item.checked);
    this.saveTableState();
    const offcanvas = document.getElementById('offcanvasRight');
    if (offcanvas) {
      this.renderer.removeClass(offcanvas, 'show');
    }
  }

  private saveTableState() {
    localStorage.setItem('selectedMenuItems', JSON.stringify(this.selectedMenuItems));
  }

  private loadTableState() {
    const storedState = localStorage.getItem('selectedMenuItems');
    if (storedState) {
      this.selectedMenuItems = JSON.parse(storedState);
      this.menuItems = this.menuItems.map(item => ({
        ...item,
        checked: this.selectedMenuItems.some(selectedItem => selectedItem.id === item.id),
      }));
    }
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
