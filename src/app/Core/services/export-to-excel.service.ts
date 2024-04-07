import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExportToExcelService {

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


  exportToExcel(filteredCandidates: any[], selectedColumns: string[]) {
    // Create worksheet from filtered candidates
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredCandidates);
  
    // Create workbook
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  
    // If selected columns are specified, remove columns not in selectedColumns
    if (selectedColumns.length > 0) {
      const headerRow = Object.keys(filteredCandidates[0]);
      headerRow.forEach((header, index) => {
        // If header is not in selectedColumns, remove it from the worksheet
        if (!selectedColumns.includes(header)) {
          delete worksheet[XLSX.utils.encode_cell({ r: 0, c: index })];
          // Delete the corresponding data cells in other rows
          filteredCandidates.forEach((candidate) => {
            delete candidate[header];
          });
        }
      });
    }
  
    // Write workbook to file
    XLSX.writeFile(workbook, 'candidates.xlsx');
  }

}
