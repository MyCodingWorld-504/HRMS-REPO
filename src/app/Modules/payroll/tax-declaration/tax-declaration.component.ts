import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-tax-declaration',
  templateUrl: './tax-declaration.component.html',
  styleUrls: ['./tax-declaration.component.scss']
})
export class TaxDeclarationComponent implements OnInit {

  name: string = '';
  employeeId: string = '';
  pan: string = '';
lastYearClaimed: any;
lastYearClaimedValue : any;
thisYearClaim: any;
verification: any;
number: any;
email: any;
spouseName: any;
childrenNames: any;
dependentParents: any;
singleEntry: any;
modeOfPayments: string[] = ["Cash", "Credit Card", "Debit Card", "PayPal"];
rentEntries = [
  { slNo: 1, month: 'January', rent: '1000', modeOfPayment: 'Cash', landlordName: '', landlordAddress: '', panCard: '', attachedDocumentType: '' },
];

houseProperties =[{label: 'Interest paid on Housing Loan  (If Joint Property % of Share)'},
{label :'date of completion'},
{label :'date of availing'},
{label :'the amount loan taken'},
{label :'name of the banker'},
{label :'Address of the Lender'},
{label :'Address of the house'},
{label :'Home loan intrest provisional certificate'},
{label :'If house property is let out'},
{label :'Total Amount'},
] 

investmentsUnderSection =[{label: 'Life Insurance premiums Paid (Self / Spouse / Children)'},
{label :'Contribution To PPF (Self / Spouse / Minor Children)'},
{label :'Mutual Funds (Self)'},
{label :'Equity Linked Savings Scheme(ELSS)  (Self)'},
{label :'Equity Linked Savings Scheme(ELSS)  (Self)'},
{label :'Interest accrued on National Saving Certificate'},
{label :'Tuition Fees : college/ school in India : maximum of two children for full time education in FY 2020-2021'},
{label :'Bank / Post Office Deposit (Tax saving FDs For 5 Years or more ) (Self)'},
{label :'Principal Amount Of Housing Loan Re-payable in 2021-2022'},
{label :'Stamp-Duty, Registration Fee Incurred For purchase of House Property'},
{label :'Subscription To Pension Fund (Self)'},
{label :'Sukanya Samriddi Scheme (Only for girl child)'},
{label :'Others (Pl specify)'},
{label :'Total Amount'},
]

investmentsQualifyingForDeduction =[
{section: '80D' },{section: '80D' },{section: '80E' },
{label :'Subscription To Mediclaim Policy For Self, Spouse, Dependent Children --> 25,000'},
{label :'Subscription To Mediclaim Policy For Parents (Rs.5000/- more for Sr.Citizens)	-->  25,000'},
{label :'Repayment Interest on Education Loan taken For Higher Education for Self, Spouse or Children (Provide Educational Loan Provisional Cerficate with principle & Interest breakup)	-->    Full Int. paid in F.Y'},
]		

entry = { modeOfPayment: "" };
showAllRows: boolean = false;

selectedModeOfPayment: string = "";
commonValue: any;
ownerDetails: any;
ownerDetailsPlaceholder: any;
constructor(private toastr: ToastrService) {
  for (let i = 1; i <= 12; i++) {
    const monthName = this.getMonthName(i);
    const entryExists = this.rentEntries.some(entry => entry.month === monthName);
    if (!entryExists) {
      this.rentEntries.push({
        slNo: this.rentEntries.length + 1,
        month: monthName,
        rent: '',
        modeOfPayment: '',
        landlordName: '',
        landlordAddress: '',
        panCard: '',
        attachedDocumentType: ''
      });
    }
  }
}

  ngOnInit() {
    this.singleEntry = this.rentEntries[0];
  }
  updateCheckbox(value: string): void {
    this.lastYearClaimed = value;
  }

getMonthName(monthNumber: number): string {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return months[monthNumber - 1];
}

updateModeOfPayment(event: any) {
  this.selectedModeOfPayment = event;
}

onFileSelected(event: any) {
  const file: File = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.rentEntries[0].attachedDocumentType = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

areFieldsFilled(): boolean {
  return this.rentEntries.every(entry =>
    entry.landlordName && entry.landlordAddress && entry.panCard && entry.attachedDocumentType
  );
}

onSubmit() {
  if (this.areFieldsFilled()) {
    this.toastr.success('Form submitted successfully!', 'Success');
  } else {
    this.toastr.error('Please fill in all mandatory fields!', 'Error');
  }
}


toggleShowAllRows() {
  this.showAllRows = !this.showAllRows;
}

generatePDF() {
  this.toastr.warning('Pdf download in process', 'Processing...', { timeOut: 500 });
  const content = document.getElementById('contentToPrint')!;
  html2canvas(content, {
    scale: 2
  }).then(canvas => {
    let pdf = new jsPDF('p', 'mm', 'a4');
    let imgWidth = 210;
    let pageHeight = 295;
    let imgHeight = canvas.height * imgWidth / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    pdf.save('Tax-deduction.pdf');
    this.toastr.success('Pdf download complete','Success');
  });
}



}
