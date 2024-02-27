import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faArrowsRotate, faEye, faPen, faTrash, faX } from '@fortawesome/free-solid-svg-icons';
import { BankDetailService } from '../service/bank-detail.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { GroupService } from 'src/app/Core/services/group.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent {
designationOptions: any;
  submitInternalForm() {
    throw new Error('Method not implemented.');
    }
      faArrowsRotateIcon = faArrowsRotate;
      faEyeIcon = faEye;
      faTrashIcon = faTrash;
      faPenIcon = faPen;
      isTooltipVisible = false;
      currentTooltip = '';
      itemsPerPageSelect: any;
      departments: any[] = [];
      departmentsData: any[] = [];
      searchTerm: string = '';
      departmentPage: number = 1;
      itemsPerPageOptionsDepartmentPage: number[] = [5, 10, 15, 25, 50 ];
      itemsPerPageDepartmentsPage: number = this.itemsPerPageOptionsDepartmentPage[0];;
      groupFormDepartment: FormGroup;
      
    
      private groupSubscription: Subscription | undefined;
    
    
      constructor(
        private groupService: GroupService,
        private formBuilder: FormBuilder
      ) {
        this.groupFormDepartment = this.formBuilder.group({
          searchTermInternal: [''],
          itemsPerPageInternal: [this.itemsPerPageDepartmentsPage],
          pageInternal: [this.departmentPage],
        });
    

    
      }
    
    
      ngOnInit(): void {
        this.fetchInternalData();
       
      }
    
      ngOnDestroy(): void {
        if (this.groupSubscription) {
          this.groupSubscription.unsubscribe();
        }
      }
    
      fetchInternalData() {
        this.groupSubscription = this.groupService.getDepartmentsData().subscribe({
          next: (data: any) => {
            this.departments = data;
            this.departmentsData = [...this.departments];
          },
          error: (error) => {
            console.error('Error fetching groups:', error);
          },
        });
      }
    
    
      protected searchInternal() {
        const term = this.groupFormDepartment.get('searchTermInternal')?.value;
    
        if (!term) {
          this.departmentsData = [...this.departments];
          return;
        }
    
        this.departmentsData = this.departments.filter((group) => this.searchInInternal(group, term));
      }
    
      private searchInInternal(group: any, term: string): boolean {
        for (const key in group) {
          if (group.hasOwnProperty(key)) {
            const value = group[key];
            if (
              value !== null &&
              typeof value !== 'object' &&
              String(value).toLowerCase().includes(term.toLowerCase())
            ) {
              return true;
            }
          }
        }
        return false;
      }
      onItemsPerPageChangeInternal(event: Event) {
        const target = event.target as HTMLSelectElement;
        this.itemsPerPageDepartmentsPage = parseInt(target.value);
        this.departmentPage = 1;
      }
    
    
      pageChangedInternal(event: number) {
        this.departmentPage = event;
      }
    
    
      getStartIndexInternal(): number {
        return (this.departmentPage - 1) * this.itemsPerPageDepartmentsPage + 1;
      }
    
      getEndIndexInternal(): number {
        const endIndex = this.departmentPage * this.itemsPerPageDepartmentsPage;
        return endIndex > this.departmentsData.length ? this.departmentsData.length : endIndex;
      }
    
      onRefreshInternal() {
        this.groupFormDepartment.get('searchTermInternal')?.setValue('');
        this.searchInternal();
      }

      showTooltip(event: MouseEvent): void {
        const target = event.currentTarget as HTMLElement;
        const tooltip = target.querySelector('.tooltip') as HTMLElement;
        if (tooltip) {
          tooltip.style.opacity = '1';
          tooltip.style.visibility = 'visible';
        }
      }
    
      hideTooltip(event: MouseEvent): void {
        const target = event.currentTarget as HTMLElement;
        const tooltip = target.querySelector('.tooltip') as HTMLElement;
        if (tooltip) {
          tooltip.style.opacity = '0';
          tooltip.style.visibility = 'hidden';
        }
      }
      showTooltipIcon(tooltip: string, event: MouseEvent): void {
        this.currentTooltip = tooltip;
        this.isTooltipVisible = true;
    
        const targetElement = event.currentTarget as HTMLElement;
        const boundingRect = targetElement.getBoundingClientRect();
        const tooltipElement = targetElement.querySelector(
          '.tooltip'
        ) as HTMLElement;
    
        if (tooltipElement) {
          tooltipElement.style.top = `${
            boundingRect.top - tooltipElement.clientHeight
          }px`;
          tooltipElement.style.left = `${
            boundingRect.left +
            boundingRect.width / 2 -
            tooltipElement.clientWidth / 2
          }px`;
        }
      }
    
      hideTooltipIcon(): void {
        this.isTooltipVisible = false;
      }
      submitForm() {
        throw new Error('Method not implemented.');
      }
    

}
