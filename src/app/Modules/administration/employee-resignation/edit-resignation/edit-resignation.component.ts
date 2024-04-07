import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GroupService } from 'src/app/Core/services/group.service';

@Component({
  selector: 'app-edit-resignation',
  templateUrl: './edit-resignation.component.html',
  styleUrls: ['./edit-resignation.component.scss']
})
export class EditResignationComponent {


  editFormList: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private groupservice: GroupService,
    private toater : ToastrService
  ) {}
  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.loadDetails(id);
    });
  }

  loadDetails(id: number) {
    this.groupservice.getResignationById(id).subscribe(data => {
      this.editFormList = data;
    });
  }

  onSubmit() {
    this.groupservice.updateResignation(this.editFormList).subscribe(updatedData => {
      this.toater.success('Details are Updated','Success');
      this.router.navigate(['dashboard', 'administration', 'resignation']);
    });
  }

  onCancel() {
    this.router.navigate(['dashboard', 'administration', 'resignation']);
  }
  OnRouteDashboard(){
    this.router.navigate(['dashboard', 'administration', 'admin-dashboard']);
  }
  OnRouteEmployee(){
    this.router.navigate(['dashboard', 'administration', 'resignation']);
  }
}
