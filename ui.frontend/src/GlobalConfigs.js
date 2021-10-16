const globalConfigs = window.lebaraGlobalConfigs ? {
    apiAggregatorUrl: window.lebaraGlobalConfigs.apiAggregatorUrl,
    currencySymbol: window.lebaraGlobalConfigs.currencySymbol,
    journeyPages: JSON.parse(window.lebaraGlobalConfigs.journeyPages)
} : {};

const globalConstants = Object.freeze({
    LEBARA_SIM_CHOICE: 'lebara-sim-choice',
    SELECT_NUMBER: 'select-number',
    NEW_NUMBER_CHOICE: 'new-number-choice',
    SIM_PORT_IN: 'sim-port-in',
    PERSONAL_DETAILS: 'personal-details',
    ORDER_DETAILS: 'order-details',
    ORDER_SUBMITTED: 'order-submitted',
    EMPTY_CART: 'empty-cart',
    LOGIN: 'login',
    VERIFY_EMAIL: 'verify-email',
    RESET_PASSWORD: 'reset-password',
    POSTPAID: 'postpaid',
    MANAGE_PLAN: 'manage-plan',
    POSTPAID_DETAILS: 'postpaid-details',
    POSTPAID_PREVIEW: 'postpaid-preview',
    ADD_ONS: 'add-ons',
    TOP_UP: 'top-up',
    PREPAID: 'prepaid'
  });

  module.exports = {globalConfigs, globalConstants}