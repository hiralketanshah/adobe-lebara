export interface UserMenuProps {
  menus: MenuItem[];
  logoutLabel?: string;
}

export interface MenuItem {
  key?: number;
  label?: string;
  link?: string;
  icon?: any;
}
