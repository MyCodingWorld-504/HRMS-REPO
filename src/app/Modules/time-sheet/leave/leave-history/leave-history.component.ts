import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { faArrowsRotate, faEye, faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { GroupService } from 'src/app/Core/services/group.service';

@Component({
  selector: 'app-leave-history',
  templateUrl: './leave-history.component.html',
  styleUrls: ['./leave-history.component.scss']
})
export class LeaveHistoryComponent implements OnInit {

 
  itemsPerPageOptions: number[] = [5, 10, 15, 25, 50, 100];
  itemsPerPage: number = this.itemsPerPageOptions[0];
  faArrowsRotateIcon = faArrowsRotate;  
  departmentsData: any[] = []; 
  departmentPage: number = 1;
  pagedLeaveHistory: any;
  candidateForm: FormGroup;
  filteredcandidates: any[]=[];
  candidates: any;
  page!: number;
  candidateData: any[]=[];
;
     
      

constructor(private router : Router,
  private fb: FormBuilder){
  this.candidateForm = this.fb.group({
    searchTerm: [''],
    itemsPerPage: [this.itemsPerPage],
  });
  setTimeout(() => {
    this.candidateForm.get('itemsPerPage')?.setValue(this.itemsPerPage);
  }, 0);
}


ngOnInit(): void {
}


protected search() { 
  const term = this.candidateForm.get('searchTerm')?.value;

  if (!term) {
    this.filteredcandidates = [...this.candidates];
    return;
  }

  this.filteredcandidates = this.candidates.filter((group: any) => this.searchInGroup(group, term));
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


      onItemsPerPageChangeDepartments(event: Event) {
        const target = event.target as HTMLSelectElement;
        this.itemsPerPage = parseInt(target.value);
        this.departmentPage = 1;
      }


      pageChangedDepartments(event: number) {
        this.departmentPage = event;
      }


      getStartIndexDepartment(): number {
        return (this.departmentPage - 1) * this.itemsPerPage + 1;
      }

      getEndIndexDepartment(): number {
        const endIndex = this.departmentPage * this.itemsPerPage;
        return endIndex > this.departmentsData.length ? this.departmentsData.length : endIndex;
      }

      OnRouteDashboard(){
        this.router.navigate(['dashboard', 'timesheet', 'timesheetDashboard']);
      }

      onRouteLeaveDashboard(){
        this.router.navigate(['dashboard', 'timesheet', 'leaveManagement']);
      }

      submitForm() {
        throw new Error('Method not implemented.');
      }
 

}
