import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BankDetailService } from '../../service/bank-detail.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-emp-profiles',
  templateUrl: './edit-emp-profiles.component.html',
  styleUrls: ['./edit-emp-profiles.component.scss']
})
export class EditEmpProfilesComponent {

  editFormList: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bankService: BankDetailService,
    private toater : ToastrService
  ) {}
  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.loadDetails(id);
    });
  }

  loadDetails(id: number) {
    this.bankService.getEmployeeProfileById(id).subscribe(data => {
      this.editFormList = data;
    });
  }

  onSubmit() {
    this.bankService.updateEmployeeProfiles(this.editFormList).subscribe(updatedData => {
      this.toater.success('Employee Deatils are Updated','Success');
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
