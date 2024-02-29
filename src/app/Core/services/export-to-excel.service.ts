import { ElementRef, Injectable, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';


@Injectable({
  providedIn: 'root'
})
export class ExportToExcelService {

  @ViewChild('content')
  content!: ElementRef;

  constructor() { }

  public exportAsExcelFile(json: any[], excelFileName: string, columns: string[]): void {
    const filteredJson = json.map(item => {
      const obj: any = {};
      columns.forEach(column => {
        if(item.hasOwnProperty(column)) {
          obj[column] = item[column];
        }
      });
      return obj;
    });

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredJson);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };

    const date = new Date();
    const formattedDate = date.toLocaleDateString('en-GB').replace(/\//g, '-');
    const formattedTime = date.toTimeString().split(' ')[0].replace(/:/g, '-');
    const dateTimeFilename = `${excelFileName}_${formattedDate}_${formattedTime}.xlsx`;

    XLSX.writeFile(workbook, dateTimeFilename);
  }

}
