import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GroupService } from 'src/app/Core/services/group.service';

@Component({
  selector: 'app-view-resignation',
  templateUrl: './view-resignation.component.html',
  styleUrls: ['./view-resignation.component.scss']
})
export class ViewResignationComponent {

  formDisabled: boolean = false;
  isInputDisabled: boolean = true;
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
      this.toater.success('Bank Details are Updated','Success');
      this.router.navigate(['dashboard', 'administration', 'resignation']);
    });
  }

  onCancel() {
    this.router.navigate(['dashboard', 'administration', 'resignation']);
  }

}
