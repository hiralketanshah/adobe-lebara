export interface UserMenuProps {
  menus: MenuItem[];
}

export interface MenuItem {
  key: number;
  name: string;
  url: string;
  icon: any;
}
