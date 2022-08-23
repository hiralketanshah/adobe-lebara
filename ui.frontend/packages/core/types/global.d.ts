export declare global {
  interface Window {
    lebaraGlobalConfigs: {
      country: string;
      currencyCode: string;
      currencySymbol: string;
      paymentMessages: {
        cancelledPaymentErrorMessage: string;
        card: string;
        defaultMessage: string;
        directDebitCheckboxText: string;
        directEbanking: string;
        giroPayNote: string;
        giroPayRedirectMessage: string;
        giropay: string;
        paypal: string;
        postpaidCreditCheckFail: string;
        recurringLabel: string;
        sepadirectdebit: string;
        sofortRedirectMessage: string;
        topUpRecurringLabel: string;
      };
    };
  }
}
