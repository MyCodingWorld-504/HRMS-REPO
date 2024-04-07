import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faMinus, faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { BankDetailService } from '../../service/bank-detail.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-employee-permissions',
  templateUrl: './employee-permissions.component.html',
  styleUrls: ['./employee-permissions.component.scss']
})
export class EmployeePermissionsComponent implements OnInit {
  spanColorClass: string = 'pink-color';
  roleData: any[] = [];
  editFormList: any = {};
  filteredRoleData: any[] = [];
  newRoleName: string = '';
  faPlusIcon = faPlus;
  faMinusIcon = faMinus;
  isRoleEditClicked:boolean =false;
  isRoleClicked: boolean = false;
  isAdministraion: boolean = false;
  isAttendence: boolean = false;
  isPayroll: boolean = false;
  isTimesheet: boolean = false;
  isRecruitment: boolean = false;
  isLeave: boolean = false;
  adminData: any[]=[];
  attendanceData: any[]=[];
  payrollData: any[]=[];
  recruitmentData: any[]=[];
  timesheetData: any[]=[];
  i: any;
  faTrashIcon = faTrash;
  faPenIcon = faPen;


  constructor(private router: Router, private roleService: BankDetailService,
    private route: ActivatedRoute,
    private toastr: ToastrService) {}
headerCheckboxes = {
  pageName: false,
  view: false,
  edit: false,
  delete: false
};

  ngOnInit() {
    this.fetchRoles();
    this.getAdminData();
    this.getAttendanceData();
    this.getPayrollData();
    this.getRecruitmentData();
    this.getTimesheetData();
  }
  fetchRoles() {
    this.roleService.getAllRoles().subscribe(role => {
      this.roleData = role.sort((a: { name: string; }, b: { name: any; }) => a.name.localeCompare(b.name));
    })
  }

  onRoleSubmit() {
    this.roleService.addRole(this.newRoleName).subscribe(responce => {
      this.toastr.success('Role added successfully', 'Updated');
      this.router.navigate(['dashboard', 'administration', 'employee-permissions']);
      this.fetchRoles();
      this.isRoleClicked = false;
    });

  }

  selectAll(column: string): void {
    if (this.adminData) {
      this.adminData.forEach(item => {
        item.submenu.forEach((submenu: { [x: string]: any; }) => {
          submenu[column] = !submenu[column];
        });
      });
    }
  }
  toggleAllPageNameCheckboxes(): void {
    const toggleStatus = !this.areAllSelected();
    this.headerCheckboxes.view = toggleStatus;
    this.headerCheckboxes.edit = toggleStatus;
    this.headerCheckboxes.delete = toggleStatus;

    if (this.adminData) {
      this.adminData.forEach(item => {
        item.submenu.forEach((submenu: { view: boolean; edit: boolean; delete: boolean; }) => {
          submenu.view = toggleStatus;
          submenu.edit = toggleStatus;
          submenu.delete = toggleStatus;
        });
      });
    }
  }

  updatePageNameHeaderCheckbox(): void {
    const allSelected = this.adminData.every(item =>
      item.submenu.every((submenu: { view: any; edit: any; delete: any; }) => submenu.view && submenu.edit && submenu.delete)
    );

    this.headerCheckboxes.pageName = allSelected;
  }
  areAllSelected(): boolean {
    return this.adminData.every(item =>
      item.submenu.every((submenu: { view: any; edit: any; delete: any; }) =>
        submenu.view && submenu.edit && submenu.delete
      )
    );
  }


  onRoleClicked() {
    this.isRoleClicked = true;
  }
  onRoleCancel() {
    this.router.navigate(['dashboard', 'administration', 'employee-permissions']);
    this.isRoleClicked = false;
  }
  onAdministration() {
    this.isAdministraion = !this.isAdministraion;
    this.spanColorClass = this.isAdministraion ?   'blue-color' : 'pink-color';
  }
  onAttendence() {
    this.isAttendence = !this.isAttendence;
    this.spanColorClass = this.isAdministraion ?   'blue-color' : 'pink-color';
  }
  onPayroll() {
    this.isPayroll = !this.isPayroll;
    this.spanColorClass = this.isAdministraion ?   'blue-color' : 'pink-color';
  }
  onTimesheet() {
    this.isTimesheet = !this.isTimesheet;
    this.spanColorClass = this.isAdministraion ?   'blue-color' : 'pink-color';
  }
  onRecruitment() {
    this.isRecruitment = !this.isRecruitment;
    this.spanColorClass = this.isAdministraion ?   'blue-color' : 'pink-color';
  }
  onLeave() {
    this.isLeave = !this.isLeave;
    this.spanColorClass = this.isAdministraion ?   'blue-color' : 'pink-color';
  }
  getAdminData(): void {
    this.roleService.getAdmin().subscribe(data => {
      this.adminData = data.filter((data: { label: string; }) => data.label === 'Administration');
    });
  }

  getAttendanceData(): void {
    this.roleService.getAdmin().subscribe(data => {
      this.attendanceData =  data.filter((data: { label: string; }) => data.label === 'Attendence');
    });
  }

  getPayrollData(): void {
    this.roleService.getAdmin().subscribe(data => {
      this.payrollData =data.filter((data: { label: string; }) => data.label === 'Payrol');
    });
  }

  getRecruitmentData(): void {
    this.roleService.getAdmin().subscribe(data => {
      this.recruitmentData = data.filter((data: { label: string; }) => data.label === 'Recruitment');
    });
  }

  getTimesheetData(): void {
    this.roleService.getAdmin().subscribe(data => {
      this.timesheetData = data.filter((data: { label: string; }) => data.label === 'Timesheet');
    });
  }


  showDeleteConfirmation = false;
  deleteConfirmationId: number | null = null;



  openDeleteConfirmation(id: number) {
    this.showDeleteConfirmation = true;
    this.deleteConfirmationId = id;
  }

  onDeleteConfirmed(id: number | null) {
    if (id !== null) {
      this.showDeleteConfirmation = false;

      this.roleService.deleteRoleById(id).subscribe(() => {
        this.toastr.warning('Record deleted successfully', 'Delete');
        this.fetchRoles();
      });
    }
  }

  onCancelDelete() {
    this.showDeleteConfirmation = false;
    this.deleteConfirmationId = null;
  }

  onEdit(id: number) {
    this.router.navigate(['dashboard', 'administration', 'edit-emp-role', id]);

  }
  OnRoutePermissions(){
    this.router.navigate(['dashboard', 'administration', 'employee-roles']);
  }
  OnRouteDashboard(){
    this.router.navigate(['dashboard', 'administration', 'admin-dashboard']);
  }

}
