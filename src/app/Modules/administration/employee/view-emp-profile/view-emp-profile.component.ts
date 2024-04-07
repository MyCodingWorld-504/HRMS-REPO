import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BankDetailService } from '../../service/bank-detail.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-emp-profile',
  templateUrl: './view-emp-profile.component.html',
  styleUrls: ['./view-emp-profile.component.scss']
})
export class ViewEmpProfileComponent {


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
      this.toater.success('Bank Details are Updated','Success');
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
