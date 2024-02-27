import { Component } from '@angular/core';
import { BankDetailService } from '../service/bank-detail.service';
import { faArrowsRotate, faEye, faPen, faPlus, faTrash, faX } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-profiles',
  templateUrl: './employee-profiles.component.html',
  styleUrls: ['./employee-profiles.component.scss']
})
export class EmployeeProfilesComponent {
  faXIcon = faX;
  faEyeIcon = faEye;
  faTrashIcon = faTrash;
  faPenIcon = faPen;
  faplusIcon = faPlus
  faArrowsRotateIcon = faArrowsRotate;
  isEmployeeDetailsVisible = false;

  employeeProfiles: any[] =[];
  empForm!: FormGroup ;
  showOverlay = false;
  editMode: boolean = false;
  selectedEmployee: any;
  showAddDetailsForm: boolean = false;
  newEmployee: any = {};
 
  employeeForm: any;

  constructor(private profileService: BankDetailService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) {
      this.employeeForm = this.formBuilder.group({
        empID: ['', Validators.required],
        employeeName: ['', Validators.required],
        department: ['', Validators.required],
        designation: [''],
        phoneNumber: [''],
        email: ['', Validators.email],
        workingLocation: [''],
        workingClient: [''],
        permanentAddress: [''],
        bioData: ['']
      });
     }

  ngOnInit(): void {
    this.getEmployeeProfiles();
  }

getEmployeeProfiles(): void {
    this.profileService.getEmployeeProfiles()
      .subscribe(profiles => this.employeeProfiles = profiles);
  }

showEmployeeDetails(employee: any): void {
    this.selectedEmployee = employee;
    this.showOverlay = true;
}

deleteEmployee() {
  if (confirm('Are you sure you want to delete this employee?')) {
    // User confirmed deletion
    this.selectedEmployee = null; // Reset selectedEmployee
    this.showOverlay = false; // Hide overlay
    console.log('Employee deleted');
  } else {
    // User canceled deletion
    console.log('Deletion canceled');
  }
}

closeEmpDetails(){
  this.showOverlay = false;
}
  
toggleEditMode() {
  this.editMode = !this.editMode;
} 


toggleAddDetailsForm() {
  this.showAddDetailsForm = !this.showAddDetailsForm;    
}

addEmployee(){

  // this.profileService(this.empForm.value);
  // this.empForm.reset();
 
}

reset(){
  this.showAddDetailsForm = false;
}

openAddEmployeeOverlay() {
  this.toggleAddDetailsForm(); 
}
// closeAddEmployeeOverlay() {
//   // Add logic to close the add employee overlay
//   this.showAddEmployeeOverlay = false;
// }


  onSubmit() {
  
  }

  onRefresh() {
    throw new Error('Method not implemented.');
  }
 search() {
    throw new Error('Method not implemented.');
  }



}



