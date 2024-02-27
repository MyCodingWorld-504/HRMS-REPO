import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  faCoffee,
  faArrowsRotate,
  faPen,
  faTrash,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/Core/services/auth.service';

@Component({
  selector: 'app-hr-user-list',
  templateUrl: './hr-user-list.component.html',
  styleUrls: ['./hr-user-list.component.scss'],
})
export class HrUserListComponent {
  faArrowsRotateIcon = faArrowsRotate;
  faCoffeeIcon = faCoffee;
  faEyeIcon = faEye;
  faTrashIcon = faTrash;
  faPenIcon = faPen;
  isTooltipVisible = false;
  currentTooltip = '';
  groups: any[] = [];
  filteredGroups: any[] = [];
  searchTerm: string = '';
  page: number = 1;
  itemsPerPageOptions: number[] = [5, 10, 15, 25, 50, 100];
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
      // .slice(
      //   (this.currentPage - 1) * this.itemsPerPage,
      //   this.currentPage * this.itemsPerPage
      // )
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

  onItemsPerPageChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.itemsPerPage = parseInt(target.value);
    this.page = 1;
  }

  pageChanged(event: number) {
    this.page = event;
  }

  getStartIndex(): number {
    return (this.page - 1) * this.itemsPerPage + 1;
  }

  getEndIndex(): number {
    const endIndex = this.page * this.itemsPerPage;
    return endIndex > this.filteredGroups.length
      ? this.filteredGroups.length
      : endIndex;
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
  updateUser(code: any) {}
}
