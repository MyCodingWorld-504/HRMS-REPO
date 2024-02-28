import { Component } from '@angular/core';
import { BankDetailService } from '../service/bank-detail.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-bank-details',
  templateUrl: './add-bank-details.component.html',
  styleUrls: ['./add-bank-details.component.scss']
})
export class AddBankDetailsComponent {

  newEntry: any = {};

  constructor(private router: Router, private bankService: BankDetailService,
    private toater : ToastrService) {}
  onSubmit() {
    this.bankService.addNewBankEntry(this.newEntry).subscribe(newData => {
      console.log('New entry added successfully:', newData);
      this.toater.success('New entry added successfully','Success');
      this.router.navigate(['dashboard', 'administration', 'bank-details']);
    });
  }

  onCancel() {
    this.router.navigate(['dashboard', 'administration', 'bank-details']);
  }
}
