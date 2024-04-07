import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-applied-leaves',
  templateUrl: './applied-leaves.component.html',
  styleUrls: ['./applied-leaves.component.scss']
})
export class AppliedLeavesComponent {

  leaveRequests: any[] = [];
  pagedLeaveRequests: any[] = [];
  currentPage: number = 1;

  constructor(
    private router : Router
  ) { }

  ngOnInit(): void {
    this.leaveRequests = [
      { employeeName: 'John Doe', leaveType: 'Annual Leave', postingDate: '2024-03-01', status: 'Pending' },
      { employeeName: 'Jane Smith', leaveType: 'Sick Leave', postingDate: '2024-03-10', status: 'Pending' },
      // Add more leave requests data as needed
    ];
    this.updatePagedLeaveRequests();
  }

  updatePagedLeaveRequests() {
    const startIndex = (this.currentPage - 1) * 10; 
    const endIndex = startIndex + 10; 
    this.pagedLeaveRequests = this.leaveRequests.slice(startIndex, endIndex);
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.updatePagedLeaveRequests();
  }

  approve(request: any) {
    console.log('Leave request approved:', request);
  }

  reject(request: any) {
    console.log('Leave request rejected:', request);
  }

  OnRouteDashboard(){
    this.router.navigate(['dashboard', 'timesheet', 'timesheetDashboard']);
  }

  onRouteLeaveDashboard(){
    this.router.navigate(['dashboard', 'timesheet', 'leaveManagement']);
  }


}
