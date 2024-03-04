import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BankDetailService } from '../../service/bank-detail.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-employee-role',
  templateUrl: './edit-employee-role.component.html',
  styleUrls: ['./edit-employee-role.component.scss']
})
export class EditEmployeeRoleComponent implements OnInit {

  editFormList: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roleService: BankDetailService,
    private toastr : ToastrService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.loadDetails(id);
    });
  }

  loadDetails(id: number) {
    this.roleService.getEmployeeRolesById(id).subscribe(data => {
      this.editFormList = data;
      console.log(this.editFormList, "editFormList");
    });
  }

  onSubmit() {
    this.roleService.updateEmployeeRoles(this.editFormList).subscribe(updatedData => {
      this.toastr.success('Role Updated Successfully','Success');
      this.router.navigate(['dashboard', 'administration', 'employee-permissions']);
    });
  }

  onCancel() {
    this.router.navigate(['dashboard', 'administration', 'employee-permissions']);
  }
}
