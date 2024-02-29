import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-roles',
  templateUrl: './employee-roles.component.html',
  styleUrls: ['./employee-roles.component.scss']
})
export class EmployeeRolesComponent {

  myForm!: FormGroup;
  isVisible : boolean = false;
  groups: string[] = ['Group 1', 'Group 2', 'Group 3'];
  departments: string[] = ['Department 1', 'Department 2', 'Department 3'];

  constructor(private formBuilder: FormBuilder) { }
  items: any[] = [
    { group: 'Group 1', department: 'Department A', employeeId: '001', selectedEmployee: null },

  ];


  employees: any[] = [
    { id: 1, name: 'developer' },
    { id: 2, name: 'Admin' },
    { id: 3, name: 'Tester' },

  ];
  ngOnInit() {
    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  onClick() {
    this.isVisible = !this.isVisible;
    }
}
