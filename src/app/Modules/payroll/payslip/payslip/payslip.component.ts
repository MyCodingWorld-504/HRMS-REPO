import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ExportToExcelService } from 'src/app/Core/services/export-to-excel.service';
import { PayrollService } from 'src/app/Core/services/payroll.service';

@Component({
  selector: 'app-payslip',
  templateUrl: './payslip.component.html',
  styleUrls: ['./payslip.component.scss'],
})
export class PayslipComponent implements OnInit {
  menuItems: { id: string; label: string; checked: boolean; customHeader?: string }[] = [
    {
      id: '1',
      label: 'EmployeeID',
      checked: false,
      customHeader: 'EmployeeID'
    },
    {
      id: '2',
      label: 'Employee Name',
      checked: false,
      customHeader: 'Employee Name'
    },
    {
      id: '3',
      label: 'Basic Salary',
      checked: false,
      customHeader: 'Basic Salary'
    },
    {
      id: '4',
      label: 'Housing Allowance',
      checked: false,
      customHeader: 'Housing Allowance'
    },
    {
      id: '5',
      label: 'Transport Allowance',
      checked: false,
      customHeader: 'Transport Allowance'
    },
    {
      id: '6',
      label: 'Medical Allowance',
      checked: false,
      customHeader: 'Medical Allowance'
    },
    {
      id: '7',
      label: 'Overtime Hours',
      checked: false,
      customHeader: 'Overtime Hours'
    },
    {
      id: '8',
      label: 'Overtime Rate',
      checked: false,
      customHeader: 'Overtime Rate'
    },
    {
      id: '9',
      label: 'Gross Salary',
      checked: false,
      customHeader: 'Gross Salary'
    },
    {
      id: '10',
      label: 'Tax Deduction',
      checked: false,
      customHeader: 'Tax Deduction'
    },
    {
      id: '11',
      label: 'Insurance Deduction',
      checked: false,
      customHeader: 'Insurance Deduction'
    },
    {
      id: '12',
      label: 'Other Deductions',
      checked: false,
      customHeader: 'Other Deductions'
    },
    {
      id: '13',
      label: 'Net Salary',
      checked: false,
      customHeader: 'Net Salary'
    },
    {
      id: '14',
      label: 'Total Earnings',
      checked: false,
      customHeader: 'Total Earnings'
    },
    {
      id: '15',
      label: 'Total Deductions',
      checked: false,
      customHeader: 'Total Deductions'
    },
    {
      id: '16',
      label: 'Bank Account Number',
      checked: false,
      customHeader: 'Bank Account Number'
    },
    {
      id: '17',
      label: 'Bank Name',
      checked: false,
      customHeader: 'Bank Name'
    },
    {
      id: '18',
      label: 'Branch Name',
      checked: false,
      customHeader: 'ID Number'
    },
    {
      id: '19',
      label: 'Pay Period Start Date',
      checked: false,
      customHeader: 'Pay Period Start Date'
    },
    {
      id: '20',
      label: 'Pay Period End Date',
      checked: false,
      customHeader: 'Pay Period End Date'
    },
    {
      id: '21',
      label: 'Employee Signature',
      checked: false,
      customHeader: 'Employee Signature'
    },
    {
      id: '22',
      label: 'Manager Signature',
      checked: false,
      customHeader: 'Manager Signature'
    },
    {
      id: '23',
      label: 'Issue Date',
      checked: false,
      customHeader: 'Issue Date'
    },
    {
      id: '24',
      label: 'Pay Slip Number',
      checked: false,
      customHeader: 'Pay Slip Number'
    },
    {
      id: '25',
      label: 'Gratuity',
      checked: false,
      customHeader: 'Gratuity'
    },
    {
      id: '26',
      label: 'ESI',
      checked: false,
      customHeader: 'ESI'
    },
    {
      id: '27',
      label: 'PF',
      checked: false,
      customHeader: 'PF'
    },
    {
      id: '28',
      label: 'Loan amount',
      checked: false,
      customHeader: 'Loan amount'
    },
    {
      id: '29',
      label: 'Child Education Allowance',
      checked: false,
      customHeader: 'Child Education Allowance'
    },
    {
      id: '30',
      label: 'Special Allowance',
      checked: false,
      customHeader: 'Special Allowance'
    },
    {
      id: '31',
      label: 'Reimbursement Amount',
      checked: false,
      customHeader: 'Reimbursement Amount'
    },
  ];

  selectedMenuItems: { id: string; label: string; checked: boolean; customHeader?: string  }[] = [];
  tableData: any[] = [];
  constructor(
    private http: HttpClient,
    private payslipService: PayrollService,
    private router: Router,
    private renderer: Renderer2,
    private exportToExcelService: ExportToExcelService
  ) {}

  ngOnInit() {
    this.fetchMenuItems();
    this.loadTableState();
    this.fetchTableValues();
  }

  fetchMenuItems() {

    if (!localStorage.getItem('selectedMenuItems')) {
      this.menuItems.forEach((item) => (item.checked = true));
      this.selectedMenuItems = [...this.menuItems];
    }

    this.menuItems = this.menuItems.map((item) => {
      const isSelected = this.selectedMenuItems.some((selectedItem) => selectedItem.id === item.id);
      return { ...item, checked: isSelected };
    });
  }

  private loadTableState() {
    const storedState = localStorage.getItem('selectedMenuItems');
    if (storedState) {
      this.selectedMenuItems = JSON.parse(storedState);
      this.menuItems = this.menuItems.map(item => ({
        ...item,
        checked: this.selectedMenuItems.some(selectedItem => selectedItem.id === item.id),
      }));
    }
  }
  fetchTableValues() {
    this.payslipService.getPayslip().subscribe({
      next: (data) => {
        this.tableData = data;
      },
      error: (error) => {
        console.error('Error fetching table values:', error);
      },
    });
  }

  generateTable() {
    this.selectedMenuItems = this.menuItems.filter((item) => item.checked);
    this.saveTableState();
    const offcanvas = document.getElementById('offcanvasRight');
    if (offcanvas) {
      this.renderer.removeClass(offcanvas, 'show');
    }
  }

  private saveTableState() {
    localStorage.setItem('selectedMenuItems', JSON.stringify(this.selectedMenuItems));
  }

public exportSelectedColumns() {
  const selectedColumns = this.selectedMenuItems.filter(item => item.checked).map(item => item.label);
  const dataKeys = this.selectedMenuItems.filter(item => item.checked).map(item => item.label);
  const filteredData = this.tableData.map(row => {
    const filteredRow: any = {};
    dataKeys.forEach(key => {
      if(row.hasOwnProperty(key)) {
        filteredRow[key] = row[key];
      }
    });
    return filteredRow;
  });
  const excelFileName = 'payslip_export';
  this.exportToExcelService.exportAsExcelFile(filteredData, excelFileName, selectedColumns);
}
}


