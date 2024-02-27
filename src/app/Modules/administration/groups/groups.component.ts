import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import {
  faEye,
  faArrowsRotate,
  faTrash,
  faPen,
} from '@fortawesome/free-solid-svg-icons';
import { GroupService } from 'src/app/Core/services/group.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnInit, OnDestroy {
<<<<<<< HEAD
submitInternalForm() {
throw new Error('Method not implemented.');
}
=======
>>>>>>> f46a5594cddea03cfaf4f734e9839dd0152f60f4
  faArrowsRotateIcon = faArrowsRotate;
  faEyeIcon = faEye;
  faTrashIcon = faTrash;
  faPenIcon = faPen;
  isTooltipVisible = false;
  currentTooltip = '';
  itemsPerPageSelect: any;
<<<<<<< HEAD
  internalGroups: any[] = [];
  externalGroups: any[] = [];
  internalData: any[] = [];
  externalData: any[] = [];
  searchTermInternal: string = '';
  searchTermExternal: string = '';
  internalPage: number = 1;
  itemsPerPageOptionsInternalPage: number[] = [5, 10, 15, 25, 50, 100];
  itemsPerPageInternalPage: number = this.itemsPerPageOptionsInternalPage[0];
  externalPage: number = 1;
  itemsPerPageOptionsExternalPage: number[] = [5, 10, 15, 25, 50, 100];
  itemsPerPageExternalPage: number = this.itemsPerPageOptionsExternalPage[0];
  groupFormInternal: FormGroup;
  groupFormExternal: FormGroup;

  private groupSubscription: Subscription | undefined;


=======
  groups: any[] = [];
  filteredGroups: any[] = [];
  searchTerm: string = '';
  page: number = 1;
  itemsPerPageOptions: number[] = [5, 10, 15, 25, 50, 100];
  itemsPerPage: number = this.itemsPerPageOptions[0];
  groupForm: FormGroup;

  private groupSubscription: Subscription | undefined;

>>>>>>> f46a5594cddea03cfaf4f734e9839dd0152f60f4
  constructor(
    private groupService: GroupService,
    private formBuilder: FormBuilder
  ) {
<<<<<<< HEAD
    this.groupFormInternal = this.formBuilder.group({
      searchTermInternal: [''],
      itemsPerPageInternal: [this.itemsPerPageInternalPage],
      pageInternal: [this.internalPage],
    });

    this.groupFormExternal = this.formBuilder.group({
      searchTermExternal: [''],
      itemsPerPageExternal: [this.itemsPerPageExternalPage],
      pageExternal: [this.externalPage],
    });


  }


  ngOnInit(): void {
    this.fetchInternalData();
    this.fetchExternalData();
=======
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
>>>>>>> f46a5594cddea03cfaf4f734e9839dd0152f60f4
  }

  ngOnDestroy(): void {
    if (this.groupSubscription) {
      this.groupSubscription.unsubscribe();
    }
  }

<<<<<<< HEAD
  fetchInternalData() {
    this.groupSubscription = this.groupService.getInternalData().subscribe({
      next: (data: any) => {
        this.internalGroups = data;
        this.internalData = [...this.internalGroups];
=======
  fetchGroups() {
    this.groupSubscription = this.groupService.getGroups().subscribe({
      next: (data: any) => {
        this.groups = data;
        this.filteredGroups = [...this.groups];
>>>>>>> f46a5594cddea03cfaf4f734e9839dd0152f60f4
      },
      error: (error) => {
        console.error('Error fetching groups:', error);
      },
    });
  }

<<<<<<< HEAD

  protected searchInternal() {
    const term = this.groupFormInternal.get('searchTermInternal')?.value;

    if (!term) {
      this.internalData = [...this.internalGroups];
      return;
    }

    this.internalData = this.internalGroups.filter((group) => this.searchInInternal(group, term));
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
    this.itemsPerPageInternalPage = parseInt(target.value);
    this.internalPage = 1;
  }


  pageChangedInternal(event: number) {
    this.internalPage = event;
  }


  getStartIndexInternal(): number {
    return (this.internalPage - 1) * this.itemsPerPageInternalPage + 1;
  }

  getEndIndexInternal(): number {
    const endIndex = this.internalPage * this.itemsPerPageInternalPage;
    return endIndex > this.internalData.length ? this.internalData.length : endIndex;
  }

  onRefreshInternal() {
    this.groupFormInternal.get('searchTermInternal')?.setValue('');
    this.searchInternal();
  }


  fetchExternalData() {
    this.groupSubscription = this.groupService.getExternalData().subscribe({
      next: (data: any) => {
        this.externalGroups = data;
        this.externalData = [...this.externalGroups];
      },
      error: (error) => {
        console.error('Error fetching groups:', error);
      },
    });
  }
  protected searchExternal() {
    const term = this.groupFormExternal.get('searchTermExternal')?.value;

    if (!term) {
      this.externalData = [...this.externalGroups];
      return;
    }

    this.externalData = this.externalGroups.filter((group) => this.searchInExternal(group, term));
  }
  private searchInExternal(group: any, term: string): boolean {
=======
  protected search() {
    const term = this.groupForm.get('searchTerm')?.value;

    if (!term) {
      this.filteredGroups = [...this.groups];
      return;
    }

    this.filteredGroups = this.groups.filter((group) => this.searchInGroup(group, term));
  }

  private searchInGroup(group: any, term: string): boolean {
>>>>>>> f46a5594cddea03cfaf4f734e9839dd0152f60f4
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

<<<<<<< HEAD


  onRefreshExternal() {
    this.groupFormExternal.get('searchTermExternal')?.setValue('');
    this.searchExternal();
  }
  onItemsPerPageChangeExternal(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.itemsPerPageExternalPage = parseInt(target.value);
    this.externalPage = 1;
  }
  pageChangedExternal(event: number) {
    this.externalPage = event;
  }
  getStartIndexExternal(): number {
    return (this.externalPage - 1) * this.itemsPerPageExternalPage + 1;
  }
  getEndIndexExternal(): number {
    const endIndex = this.externalPage * this.itemsPerPageExternalPage;
    return endIndex > this.externalData.length ? this.externalData.length : endIndex;
=======
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
    return endIndex > this.filteredGroups.length ? this.filteredGroups.length : endIndex;
  }

  onRefresh() {
    this.groupForm.get('searchTerm')?.setValue('');
    this.search();
>>>>>>> f46a5594cddea03cfaf4f734e9839dd0152f60f4
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
