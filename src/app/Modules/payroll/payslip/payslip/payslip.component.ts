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
  menuItems: { id: string; label: string; checked: boolean }[] = [
    {
      id: '1',
      label: 'Employee ID',
      checked: false,
    },
    {
      id: '2',
      label: 'Employee Name',
      checked: false,
    },
    {
      id: '3',
      label: 'Basic Salary',
      checked: false,
    },
    {
      id: '4',
      label: 'Housing Allowance',
      checked: false,
    },
    {
      id: '5',
      label: 'Transport Allowance',
      checked: false,
    },
    {
      id: '6',
      label: 'Medical Allowance',
      checked: false,
    },
    {
      id: '7',
      label: 'Overtime Hours',
      checked: false,
    },
    {
      id: '8',
      label: 'Overtime Rate',
      checked: false,
    },
    {
      id: '9',
      label: 'Gross Salary',
      checked: false,
    },
    {
      id: '10',
      label: 'Tax Deduction',
      checked: false,
    },
    {
      id: '11',
      label: 'Insurance Deduction',
      checked: false,
    },
    {
      id: '12',
      label: 'Other Deductions',
      checked: false,
    },
    {
      id: '13',
      label: 'Net Salary',
      checked: false,
    },
    {
      id: '14',
      label: 'Total Earnings',
      checked: false,
    },
    {
      id: '15',
      label: 'Total Deductions',
      checked: false,
    },
    {
      id: '16',
      label: 'Bank Account Number',
      checked: false,
    },
    {
      id: '17',
      label: 'Bank Name',
      checked: false,
    },
    {
      id: '18',
      label: 'Branch Name',
      checked: false,
    },
    {
      id: '19',
      label: 'Pay Period Start Date',
      checked: false,
    },
    {
      id: '20',
      label: 'Pay Period End Date',
      checked: false,
    },
    {
      id: '21',
      label: 'Employee Signature',
      checked: false,
    },
    {
      id: '22',
      label: 'Manager Signature',
      checked: false,
    },
    {
      id: '23',
      label: 'Issue Date',
      checked: false,
    },
    {
      id: '24',
      label: 'Pay Slip Number',
      checked: false,
    },
    {
      id: '25',
      label: 'Gratuity',
      checked: false,
    },
    {
      id: '26',
      label: 'ESI',
      checked: false,
    },
    {
      id: '27',
      label: 'PF',
      checked: false,
    },
    {
      id: '28',
      label: 'Loan amount',
      checked: false,
    },
    {
      id: '29',
      label: 'Child Education Allowance',
      checked: false,
    },
    {
      id: '30',
      label: 'Special Allowance',
      checked: false,
    },
    {
      id: '31',
      label: 'Reimbursement Amount',
      checked: false,
    },
  ];

  selectedMenuItems: { id: string; label: string; checked: boolean }[] = [];
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
    this.payslipService.getPayslipLables().subscribe({
      next: (data) => {
        this.menuItems = data.map((item: { id: string; }) => {
          const isSelected = this.selectedMenuItems.some(selectedItem => selectedItem.id === item.id);
          return { ...item, checked: isSelected };
        });
      },
      error: (error) => {
        console.error('Error fetching menu items:', error);
      }
    });
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


