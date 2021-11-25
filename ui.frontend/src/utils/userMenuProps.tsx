import DashboardMenu from "../assets/images/user-menu-icons/dashboard-menu.svg";
import ManageSimMenu from "../assets/images/user-menu-icons/manage-sim-menu.svg";
import NotificationsMenu from "../assets/images/user-menu-icons/notifications-menu.svg";
import PaymentHistoryMenu from "../assets/images/user-menu-icons/payment-history-menu.svg";
import PaymentMethodsMenu from "../assets/images/user-menu-icons/payment-methods-menu.svg";
import ProfileMenu from "../assets/images/user-menu-icons/profile-menu.svg";

export default {
  menus: [
    {
      key: 1,
      name: "Dashboard",
      url: "/dashboard",
      icon: DashboardMenu,
    },
    {
      key: 2,
      name: "Notifications",
      url: "/",
      icon: NotificationsMenu,
    },
    {
      key: 3,
      name: "My Profile",
      url: "/user-profile",
      icon: ProfileMenu,
    },
    {
      key: 4,
      name: "Manage your SIM",
      url: "/manage-sim-cards",
      icon: ManageSimMenu,
    },
    {
      key: 5,
      name: "Payment methods",
      url: "/",
      icon: PaymentMethodsMenu,
    },
    {
      key: 6,
      name: "Payment history",
      url: "/",
      icon: PaymentHistoryMenu,
    },
  ],
};
