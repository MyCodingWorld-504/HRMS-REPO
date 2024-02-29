import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ImportFromExcelService {

  constructor() { }
  importExcelFile(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const reader: FileReader = new FileReader();

      reader.onload = (e: any) => {
        try {
          const data: Uint8Array = new Uint8Array(e.target.result);
          const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'array' });

          const sheetName: string = workbook.SheetNames[0];
          const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];

          const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

          resolve(jsonData);
        } catch (error) {
          reject(error);
        }
      };

      reader.readAsArrayBuffer(file);
    });
  }

  // readExcelFile(file: File): Promise<any[]> {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();

  //     reader.onload = (e: any) => {
  //       const bstr: string = e.target.result;
  //       const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});
  //       const wsname: string = wb.SheetNames[0];
  //       const ws: XLSX.WorkSheet = wb.Sheets[wsname];
  //       const data = XLSX.utils.sheet_to_json(ws, {header: 1});

  //       resolve(data);
  //     };

  //     reader.onerror = (error) => {
  //       reject(error);
  //     };

  //     reader.readAsBinaryString(file);
  //   });
  // }
}
