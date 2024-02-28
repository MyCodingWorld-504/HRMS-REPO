export interface MenuItem {
  label: string;
  route?: string;
  icon?: any;
  submenu?: MenuItem[];
  expanded?: boolean;
  collapsed?: boolean;
}
export interface Bank {
  id: number;
  empName: string;
  bankName: string;
  accountNo: string;
  branch: string;
  ifsc: string;
  aadhar: string;
  pan: string;
  address: string;
  // Add other form fields as needed
}
