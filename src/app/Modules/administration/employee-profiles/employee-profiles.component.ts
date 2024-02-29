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
submitForm() {
throw new Error('Method not implemented.');
}
  faXIcon = faX;
  faEyeIcon = faEye;
  faTrashIcon = faTrash;
  faPenIcon = faPen;
  faPlusIcon =faPlus;
  faArrowsRotateIcon = faArrowsRotate;
  empForm!: FormGroup ;
  employeeProfiles : any[] =[];
  employeeData : any[] =[];
  searchTerm: string = '';
  page: number = 1;
  itemsPerPageOptions: number[] = [5, 10, 15, 25, 50, 100];
  itemsPerPage: number = this.itemsPerPageOptions[0];
  constructor(private profileService: BankDetailService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) {
      this.empForm = this.formBuilder.group({
        searchTerm: [''],
        itemsPerPage: [this.itemsPerPage],
      });
      setTimeout(() => {
        this.empForm.get('itemsPerPage')?.setValue(this.itemsPerPage);
      }, 0);

     }

  ngOnInit(): void {
    this.getEmployeeProfiles();
  }

  getEmployeeProfiles() {
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




}



