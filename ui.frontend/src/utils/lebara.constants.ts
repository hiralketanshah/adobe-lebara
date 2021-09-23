import { MenuOption } from "../components/Header/types";

// Regex for input fields
export const ADDRESS_FIELD_PATTERN = /^[a-zA-Z0-9]+[a-zA-Z0-9 ]*$/;
export const TOWN_CITY_FIELD_PATTERN = /^[a-zA-Z ]+[a-zA-Z ]*$/;
export const NUMBER_FIELD_PATTERN = /^[0-9]*$/;
export const ALPHA_NUMERIC_FIELD_PATTERN = /^[a-zA-Z0-9]*$/;
export const NAME_FIELD_PATTERN = /^[a-zA-Z]+[a-zA-Z ]+[a-zA-Z-]+[a-zA-Z']*$/;
export const EMAIL_FIELD_PATTERN = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
export const DAY_RANGE = /\b([1-9]|[12][0-9]|3[01])\b/;
export const MONTH_RANGE = /\b([1-9]|1[0-2])\b/;
export const YEAR_RANGE = /^(194[5-9]|19[5-9]\d|200\d|201[0-9])$/;

export const menuOptions: MenuOption[] = [
  {
    menuName: "Sim Only",
    isDisabled: false,
    subMenuOption: [
      {
        menuOptionName: "Phone",
        subMenuOptions: [
          {
            subMenuOptionName: "Iphone",
            isDisabled: false,
            isNewPlan: false,
          },
          {
            subMenuOptionName: "Samsung",
            isDisabled: false,
            isNewPlan: false,
          },
          {
            subMenuOptionName: "Google",
            isDisabled: false,
            isNewPlan: false,
          },
        ],
      },
      {
        menuOptionName: "Sim Only Plans",
        subMenuOptions: [
          {
            subMenuOptionName: "Pay Monthly SIM Plan",
            isDisabled: false,
            isNewPlan: false,
          },
          {
            subMenuOptionName: "12-month SIM Only Plan ",
            isDisabled: false,
            isNewPlan: true,
          },
          {
            subMenuOptionName: "Pay As You Go SIM only plan",
            isDisabled: false,
            isNewPlan: false,
          },
        ],
      },
      {
        menuOptionName: "Other Plans",
        subMenuOptions: [
          {
            subMenuOptionName: "Top-up",
            path: "/top-up",
            isDisabled: false,
            isNewPlan: false,
          },
          {
            path: "/add-ons",
            subMenuOptionName: "Add-on’s ",
            isDisabled: false,
            isNewPlan: false,
          },
        ],
      },
      {
        menuOptionName: "Lebara Offers",
        subMenuOptions: [
          {
            subMenuOptionName: "Partner Offers",
            isDisabled: false,
            isNewPlan: true,
          },
          {
            subMenuOptionName: "Refer & Earn",
            isDisabled: false,
            isNewPlan: false,
          },
        ],
      },
    ],
  },
  {
    menuName: "Prepaid",
    isDisabled: true,
    subMenuOption: [],
  },
  {
    menuName: "Earn & Refer",
    isDisabled: true,
    subMenuOption: [],
  },
  {
    menuName: "Help & Support",
    isDisabled: true,
    subMenuOption: [],
  },
];
