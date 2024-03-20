import { Component } from '@angular/core';

@Component({
  selector: 'app-leave-form',
  templateUrl: './leave-form.component.html',
  styleUrls: ['./leave-form.component.scss']
})
export class LeaveFormComponent {

  leaveRequest: any = {}; 
  submitForm() {
    console.log(this.leaveRequest); 
  }

}
