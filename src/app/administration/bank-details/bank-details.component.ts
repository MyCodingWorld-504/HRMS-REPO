import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { faEye , faArrowsRotate} from '@fortawesome/free-solid-svg-icons';
import { BankDetailService } from '../service/bank-detail.service';


@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.scss']
})
export class BankDetailsComponent implements OnInit, OnDestroy{
  faArrowsRotateIcon = faArrowsRotate;
  faEyeIcon = faEye;
  itemsPerPageSelect: any;
  groups: any[] = [];
  filteredGroups: any[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPageOptions: number[] = [5,10, 15];
  itemsPerPage: number = this.itemsPerPageOptions[0];
  groupForm: FormGroup;

  private groupSubscription: Subscription | undefined;

  constructor(
    private bankService : BankDetailService,
    private formBuilder: FormBuilder
  ) {
    this.groupForm = this.formBuilder.group({
      searchTerm: [''],
      itemsPerPage: [this.itemsPerPage],
    });
    setTimeout(() => {
      this.groupForm.get('itemsPerPage')?.setValue(this.itemsPerPage);
    }, 0);
  }

  ngOnInit(): void {
    this.fetchGroups();
  }

  ngOnDestroy(): void {
    if (this.groupSubscription) {
      this.groupSubscription.unsubscribe();
    }
  }

  fetchGroups() {
    this.groupSubscription = this.bankService.getAll().subscribe({
      next: (data: any) => {
        this.groups = data;
        this.filteredGroups = [...this.groups];
      },
      error: (error) => {
        console.error('Error fetching groups:', error);
      },
    });
  }

 protected search() {
    const term = this.groupForm.get('searchTerm')?.value;

    if (!term) {
      this.filteredGroups = [...this.groups];
      return;
    }

    this.filteredGroups = this.groups
      .slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage)
      .filter((group) => this.searchInGroup(group, term));
  }


  private searchInGroup(group: any, term: string): boolean {
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

  getTotalPages(): number {
    return Math.ceil(this.filteredGroups.length / this.itemsPerPage);
  }

  onItemsPerPageChange(): void {
    this.itemsPerPage = this.groupForm.get('itemsPerPage')?.value;
    this.currentPage = 1;
  }
  getStartIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  getEndIndex(): number {
    const end = this.currentPage * this.itemsPerPage;
    return end > this.filteredGroups.length ? this.filteredGroups.length : end;
  }

  onRefresh() {
    this.groupForm.get('searchTerm')?.setValue('');
    this.search();
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
  submitForm() {
    throw new Error('Method not implemented.');
  }
}
