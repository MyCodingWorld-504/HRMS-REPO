import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GroupService } from 'src/app/Core/services/group.service';

@Component({
  selector: 'app-add-resignation',
  templateUrl: './add-resignation.component.html',
  styleUrls: ['./add-resignation.component.scss']
})
export class AddResignationComponent {

  newEntry: any = {};

  constructor(private router: Router, private groupservice: GroupService,
    private toater : ToastrService) {}
  onSubmit() {
    this.groupservice.addNewResignation(this.newEntry).subscribe(newData => {
      this.toater.success('New entry added successfully','Success');
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
