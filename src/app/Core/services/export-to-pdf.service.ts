import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
@Injectable({
  providedIn: 'root',
})
export class ExportToPdfService {
  constructor(private http: HttpClient) {}
  private loadImage(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.http.get(url, { responseType: 'blob' }).subscribe(response => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.readAsDataURL(response);
      }, reject);
    });
  }
  public async exportTableToPDF(data: any[], columns: string[]): Promise<void> {
    const doc = new jsPDF();
    const logo = await this.loadImage('assets/Mainlogo.jpg');
    const logoWidth = 40;
    const logoHeight = 20;
    doc.addImage(logo, 'PNG', 1, 1, logoWidth, logoHeight);

const tableStartY = logoHeight + 2;
    const fontSize = this.calculateFontSize(columns.length);
    doc.setFontSize(fontSize);

    const body = data.map((row) => columns.map((fieldName) => row[fieldName]));
    const head = [columns];

    autoTable(doc, {
      head,
      body,
      theme: 'grid',
      startY: tableStartY,
      headStyles: {
        fillColor: [8, 101, 148],
        textColor: 255,
        fontStyle: 'bold',
        lineWidth: 0.1,
        lineColor: [0, 0, 0]
      },
      styles: {
        lineWidth: 0.1,
        lineColor: [0, 0, 0],
        font: 'helvetica',
        fontSize: fontSize
      },
      didDrawPage: (data) => {

        const pageHeight = doc.internal.pageSize.height;
        const description = "@SkyHr.com                                                         for internal use only";
        doc.setFontSize(10);
        doc.text(description, 10, pageHeight - 5);
      }
    });

    if (typeof doc.putTotalPages === "function") {
      doc.putTotalPages((doc as any).internal.getNumberOfPages().toString());
    }

    const filename = `Sky-Hr_${this.getCurrentDateTime()}.pdf`;
    doc.save(filename);
  }

  private calculateFontSize(columnCount: number): number {
    if (columnCount <= 3) {
      return 14;
    } else if (columnCount <= 6) {
      return 11;
    } else {
      return 8;
    }
  }


  private getCurrentDateTime(): string {
    const now = new Date();

    const dateTime = `${now.getFullYear()}-${this.padTo2Digits(
      now.getMonth() + 1
    )}-${this.padTo2Digits(now.getDate())}_${this.padTo2Digits(
      now.getHours()
    )}-${this.padTo2Digits(now.getMinutes())}-${this.padTo2Digits(
      now.getSeconds()
    )}`;
    return dateTime;
  }

  private padTo2Digits(num: number): string {
    return num.toString().padStart(2, '0');
  }

  exportFormToPDF(elementToPrint: HTMLElement, fileName: string): void {
    html2canvas(elementToPrint, { backgroundColor: null }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(fileName);
    });
  }
  
  
  
}
