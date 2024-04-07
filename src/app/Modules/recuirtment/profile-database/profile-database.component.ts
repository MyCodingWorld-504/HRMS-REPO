import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowsRotate, faEye, faPen, faPlus, faTrash, faX , faHandshake } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Label } from 'src/app/Core/models/MenuItem';
import { ExportToExcelService } from 'src/app/Core/services/export-to-excel.service';
import { RecuirtmentService } from 'src/app/Core/services/recuirtment.service';
import { SharedService } from 'src/app/Core/services/shared.service';
import * as XLSX from 'xlsx';





@Component({
  selector: 'app-profile-database',
  templateUrl: './profile-database.component.html',
  styleUrls: ['./profile-database.component.scss']
})
export class ProfileDatabaseComponent {

  showOverlay: boolean = false;
  candidate: any;
  labels: Label[] = [
    { name: 'Label 1', selected: false },
    { name: 'Label 2', selected: false },
    { name: 'Label 3', selected: false },
  ];
  candidates: any[] = [];
  filteredCandidates: any[]= [];
  fromDate!: Date;
  toDate!: Date;
  faXIcon = faX;
  faHandshake = faHandshake;
  faEyeIcon = faEye;
  faTrashIcon = faTrash;
  faPenIcon = faPen;
  faPlusIcon = faPlus;
  isTooltipVisible = false;
  currentTooltip = '';
  faArrowsRotateIcon = faArrowsRotate;
  empForm!: FormGroup;
  candidateData: any[] = [];
  searchTerm: string = '';
  page: number = 1;
  itemsPerPageOptions: number[] = [5, 10, 15, 25, 50, 100];
  itemsPerPage: number = this.itemsPerPageOptions[0];
  showTable: boolean = false;
  exportForm! :FormGroup ;
  exportColumns: any = {};
  selectedColumns: string[] = [];
  profileForm! : FormGroup;
  showScheduleOverlay: boolean = false;
  candidateKeys: string[] = [];
  newCandidate:any={};
  newScheduleCandidate: any={};
  selectedHeaders: { [key: string]: boolean } = {};
  addCandidateForm!:FormGroup;
  candidateId!: number;

  constructor(private excel:ExportToExcelService,
    private fb: FormBuilder,
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private toastr:ToastrService,
    private recruitmentService:RecuirtmentService,
    private router:Router) {

      this.profileForm = this.fb.group({
        searchTerm: [''],
        itemsPerPage: [this.itemsPerPage],
      });
      
      setTimeout(() => {
        this.profileForm.get('itemsPerPage')?.setValue(this.itemsPerPage);
      }, 0);


      this.exportForm = this.fb.group({
        name: true,
        email: false
      });

     
     }

  openOverlay() {
      this.showOverlay = true;
  }

  closeOverlay() {
      this.showOverlay = false;
  }


ngOnInit(){
  this.fetchCandidates();
  this.initializeForm();


  const candidateId = '';
  this.loadcandidates(candidateId);


}


headers: string[] = [];
data: any[] = [];
filteredData: any[] = [];
showControls: boolean = false;



fetchCandidates() {
  this.recruitmentService.getCandidates().subscribe((response: any[]) => {
    this.data = response;
    this.headers = Object.keys(response[0]);
    this.headers.forEach(header => {
      this.selectedHeaders[header] = true;
    });
    this.filteredData = [...this.data];
    this.candidateData = response;
    this.showCandidates();
    console.log(this.filteredData);
  });
}

initializeForm() {
  this.profileForm = this.fb.group({
    searchTerm: [''],
    status: [''] 
  });
}


loadcandidates(candidateId: string) {
  this.recruitmentService.getCandidateById(candidateId).subscribe(
    data => {
      console.log('Candidate Details:', data);
      this.newScheduleCandidate = data; // Assuming data is fetched correctly
    },
    error => {
      console.error('Error fetching candidate details:', error);
    }
  );
}


showCandidates(): void {
  if (!this.fromDate || !this.toDate) {
    console.error("From Date or To Date is missing");
    return;
  }

  const fromDate = new Date(this.fromDate);
  const toDate = new Date(this.toDate);

  console.log("From Date:", fromDate);
  console.log("To Date:", toDate);

  this.filteredData = this.candidateData.filter(candidate => {
    const candidateDate = new Date(candidate["Submitted Date"]);
    console.log("Candidate Date:", candidateDate);
    return candidateDate >= fromDate && candidateDate <= toDate;
  });

  console.log("Filtered Data:", this.filteredData);
}





exportData() {
  const filteredHeaders = this.headers.filter(header => this.selectedHeaders[header]);
  const filteredData = this.data.map(row => {
    const filteredRow: any = {};
    filteredHeaders.forEach(header => {
      filteredRow[header] = row[header];
    });
    return filteredRow;
  });


  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredData);
  const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  this.saveAsExcelFile(excelBuffer, 'exported_data');
  this.resetCheckboxes();
}

saveAsExcelFile(buffer: any, fileName: string): void {
  const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
  const a: HTMLAnchorElement = document.createElement('a');
  document.body.appendChild(a);
  a.href = window.URL.createObjectURL(data);
  a.download = fileName + '.xlsx';
  a.click();
  document.body.removeChild(a);
}




toggleCheckbox(header: string): void {
  this.selectedHeaders[header] = !this.selectedHeaders[header];
}

toggleControls(): void {
  this.showControls = true;
}

closeExcel(){
  this.showControls = false;
}

resetCheckboxes() {
  for (const header in this.selectedHeaders) {
    if (this.selectedHeaders.hasOwnProperty(header)) {
      this.selectedHeaders[header] = false;
    }
  }
}

hideTable() {
  this.showTable = false;
}




onFileSelected($event: Event) {
throw new Error('Method not implemented.');
}

protected search() {
  const term = this.profileForm.get('searchTerm')?.value;

  if (!term) {
    this.filteredData = [...this.data];
    return;
  }

  this.filteredData = this.data.filter(candidate => this.searchInCandidate(candidate, term));
}

private searchInCandidate(candidate: any, term: string): boolean {
  for (const key in candidate) {
    if (candidate.hasOwnProperty(key)) {
      const value = candidate[key];
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
  this.profileForm.get('searchTerm')?.setValue('');
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

OnRouteDashboard(){
  this.router.navigate(['dashboard', 'recuirtment', 'recuirtment-dashboard']);
}

openScheduleOverlay(candidateId: number) {
  const selectedCandidate = this.filteredData.find(candidate => candidate.id === candidateId);
  if (selectedCandidate) {
    this.newScheduleCandidate = selectedCandidate;
    this.showScheduleOverlay = true;
  } else {
    console.error(`Candidate with ID ${candidateId} not found.`);
  }
}

closeScheduleOverlay() {
  this.showScheduleOverlay = false; 
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

    this.recruitmentService.addNewCandidateProfiles(this.newCandidate).subscribe((response) => {
      this.candidateData.push(response);
      this.newCandidate = {};
      this.fetchCandidates(); 
    }, (error) => {
      console.error('Error adding new candidate profile:', error);
    });  
  }

  addCandidate() {
    this.recruitmentService.addNewCandidateSchedule(this.newScheduleCandidate).subscribe(
      (response) => {
        console.log('New candidate added:', response);
        this.toastr.success('New candidate added successfully!', 'Success');
        this.router.navigate(['dashboard', 'recuirtment', 'scheduler-status']);

      },
      (error) => {
        console.error('Error adding new candidate:', error);
      }
    );
  }
  
}
