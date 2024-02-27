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
  selector: 'app-resignation',
  templateUrl: './resignation.component.html',
  styleUrls: ['./resignation.component.scss']
})
export class ResignationComponent {
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
  publicHoliday: any[] = [];
  optionalHoliday: any[] = [];
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


  constructor(
    private groupService: GroupService,
    private formBuilder: FormBuilder
  ) {
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
    this.fetchPunHolidayData();
  }

  ngOnDestroy(): void {
    if (this.groupSubscription) {
      this.groupSubscription.unsubscribe();
    }
  }

  fetchPunHolidayData() {
    this.groupSubscription = this.groupService.getResignedEmp().subscribe({
      next: (data: any) => {
        this.publicHoliday = data;
        this.internalData = [...this.publicHoliday];
      },
      error: (error) => {
        console.error('Error fetching groups:', error);
      },
    });
  }


  protected searchpublicholiday() {
    const term = this.groupFormInternal.get('searchTermInternal')?.value;

    if (!term) {
      this.internalData = [...this.publicHoliday];
      return;
    }

    this.internalData = this.publicHoliday.filter((group) => this.searchInInternal(group, term));
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
    this.searchpublicholiday();
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
