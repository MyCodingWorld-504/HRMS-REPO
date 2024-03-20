import { Component } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { faArrowsRotate, faEye, faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { GroupService } from 'src/app/Core/services/group.service';

@Component({
  selector: 'app-leave-history',
  templateUrl: './leave-history.component.html',
  styleUrls: ['./leave-history.component.scss']
})
export class LeaveHistoryComponent {


   
      departmentsData: any[] = [];
     
      departmentPage: number = 1;
      itemsPerPageOptionsDepartmentPage: number[] = [5, 10, 15, 25, 50 ];
      itemsPerPageDepartmentsPage: number = this.itemsPerPageOptionsDepartmentPage[0];pagedLeaveHistory: any;
;
     
      


     


      onItemsPerPageChangeDepartments(event: Event) {
        const target = event.target as HTMLSelectElement;
        this.itemsPerPageDepartmentsPage = parseInt(target.value);
        this.departmentPage = 1;
      }


      pageChangedDepartments(event: number) {
        this.departmentPage = event;
      }


      getStartIndexDepartment(): number {
        return (this.departmentPage - 1) * this.itemsPerPageDepartmentsPage + 1;
      }

      getEndIndexDepartment(): number {
        const endIndex = this.departmentPage * this.itemsPerPageDepartmentsPage;
        return endIndex > this.departmentsData.length ? this.departmentsData.length : endIndex;
      }

 

}
