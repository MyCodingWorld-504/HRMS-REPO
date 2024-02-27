export interface MenuItem {
  label: string;
  route?: string;
  icon?: any;
  submenu?: MenuItem[];
  expanded?: boolean;
  collapsed?: boolean;
}
