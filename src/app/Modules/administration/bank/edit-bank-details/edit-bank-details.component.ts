import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BankDetailService } from '../../service/bank-detail.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-bank-details',
  templateUrl: './edit-bank-details.component.html',
  styleUrls: ['./edit-bank-details.component.scss']
})
export class EditBankDetailsComponent {
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
    this.bankService.getBankDetailsById(id).subscribe(data => {
      this.editFormList = data;
    });
  }

  onSubmit() {
    this.bankService.updateBankDetails(this.editFormList).subscribe(updatedData => {
      this.toater.success('Bank Details are Updated','Success');
      this.router.navigate(['dashboard', 'administration', 'bank-details']);
    });
  }

  onCancel() {
    this.router.navigate(['dashboard', 'administration', 'bank-details']);
  }
  
  OnRouteDashboard(){
    this.router.navigate(['dashboard', 'administration', 'admin-dashboard']);
  }
  OnRouteEmployee(){
    this.router.navigate(['dashboard', 'administration', 'bank-details']);
  }
}
