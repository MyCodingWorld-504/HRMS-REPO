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

}

export interface ShiftOption {
  name: string;
  color: string;
  time: string;
}

export interface LeaveOptions{
  id: string,
  label: string,
  checked: boolean,
  customHeader: string;
}

export interface Shift
{
  id: any;
  shift: string;
  time: string;
  date: string;
  leaveApplied: boolean;

}

export interface PublicHoliday {
  sno: number;
  holidayName: string;
  date: string;
  day: string;
  id: string;
}
