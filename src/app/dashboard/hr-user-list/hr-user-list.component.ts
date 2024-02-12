import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { faCoffee , faArrowsRotate} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-hr-user-list',
  templateUrl: './hr-user-list.component.html',
  styleUrls: ['./hr-user-list.component.scss']
})
export class HrUserListComponent {
  faArrowsRotateIcon = faArrowsRotate;
  faCoffeeIcon = faCoffee;
  itemsPerPageSelect: any;
  groups: any[] = [];
  filteredGroups: any[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPageOptions: number[] = [2, 3, 5, 10];
  itemsPerPage: number = this.itemsPerPageOptions[0];
  groupForm: FormGroup;

  private groupSubscription: Subscription | undefined;

  constructor(
    private authService: AuthService,
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

  protected fetchGroups() {
    this.groupSubscription = this.authService.getAll().subscribe({
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

  protected searchInGroup(group: any, term: string): boolean {
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

  protected getTotalPages(): number {
    return Math.ceil(this.filteredGroups.length / this.itemsPerPage);
  }

  protected onItemsPerPageChange(): void {
    this.itemsPerPage = this.groupForm.get('itemsPerPage')?.value;
    this.currentPage = 1;
  }
  protected getStartIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  protected getEndIndex(): number {
    const end = this.currentPage * this.itemsPerPage;
    return end > this.filteredGroups.length ? this.filteredGroups.length : end;
  }

  protected onRefresh() {
    this.groupForm.get('searchTerm')?.setValue('');
    this.search();
  }
  protected showTooltip(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    const tooltip = target.querySelector('.tooltip') as HTMLElement;
    if (tooltip) {
      tooltip.style.opacity = '1';
      tooltip.style.visibility = 'visible';
    }
  }

  protected hideTooltip(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    const tooltip = target.querySelector('.tooltip') as HTMLElement;
    if (tooltip) {
      tooltip.style.opacity = '0';
      tooltip.style.visibility = 'hidden';
    }
  }
  protected submitForm() {
    throw new Error('Method not implemented.');
  }

  updateUser(code:any){

  }
}
