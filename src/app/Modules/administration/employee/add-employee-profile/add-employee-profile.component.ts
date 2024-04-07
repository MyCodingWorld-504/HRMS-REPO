import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BankDetailService } from '../../service/bank-detail.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-employee-profile',
  templateUrl: './add-employee-profile.component.html',
  styleUrls: ['./add-employee-profile.component.scss']
})
export class AddEmployeeProfileComponent {

  newEntry: any = {};

  constructor(private router: Router, private bankService: BankDetailService,
    private toater : ToastrService) {}
  onSubmit() {
    this.bankService.addNewEmployeeProfiles(this.newEntry).subscribe(newData => {
      this.toater.success('New entry added successfully','Success');
      this.router.navigate(['dashboard', 'administration', 'emp-profiles']);
    });
  }

  onCancel() {
    this.router.navigate(['dashboard', 'administration', 'emp-profiles']);
  }
  OnRouteDashboard(){
    this.router.navigate(['dashboard', 'administration', 'admin-dashboard']);
  }
  OnRouteEmployee(){
    this.router.navigate(['dashboard', 'administration', 'emp-profiles']);
  }
}
