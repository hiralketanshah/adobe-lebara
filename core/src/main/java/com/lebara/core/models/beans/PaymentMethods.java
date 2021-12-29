package com.lebara.core.models.beans;

import com.fasterxml.jackson.annotation.JsonInclude;
import org.apache.commons.codec.binary.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Model(adapters = {PaymentMethods.class}, adaptables = {Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class PaymentMethods {

    @ValueMapValue
    private String card;

    @ValueMapValue
    private String paypal;

    @ValueMapValue
    private String giropay;

    @ValueMapValue
    private String sepadirectdebit;

    @ValueMapValue
    private String defaultMessage;

    @ValueMapValue
    private String directEbanking;

    @ValueMapValue
    private String directDebitCheckboxText;

    @ValueMapValue
    private String giroPayRedirectMessage;

    @ValueMapValue
    private String sofortRedirectMessage;

    @ValueMapValue
    private String giroPayNote;

    @ValueMapValue
    private String postpaidCreditCheckFail;

    @ValueMapValue
    private String fraudErrorMessage;

    @ValueMapValue
    private String cancelledPaymentErrorMessage;

    @ValueMapValue
    private String topUpRecurringLabel;

    @ValueMapValue
    private String recurringLabel;


    public String getCard() {
        return getUTFStr(card);
    }

    public String getPaypal() {
        return getUTFStr(paypal);
    }

    public String getGiropay() {
        return getUTFStr(giropay);
    }

    public String getSepadirectdebit() {
        return getUTFStr(sepadirectdebit);
    }

    public String getDefaultMessage() {
        return getUTFStr(defaultMessage);
    }

    public String getDirectEbanking() {
        return getUTFStr(directEbanking);
    }

    public String getDirectDebitCheckboxText() {
        return getUTFStr(directDebitCheckboxText);
    }

    public String getGiroPayRedirectMessage() {
        return getUTFStr(giroPayRedirectMessage);
    }

    public String getSofortRedirectMessage() {
        return getUTFStr(sofortRedirectMessage);
    }

    public String getGiroPayNote() {
        return getUTFStr(giroPayNote);
    }

    public String getPostpaidCreditCheckFail() {
        return getUTFStr(postpaidCreditCheckFail);
    }

    public String getFraudErrorMessage() {
        return getUTFStr(fraudErrorMessage);
    }

    public String getCancelledPaymentErrorMessage() {
        return getUTFStr(cancelledPaymentErrorMessage);
    }

    public String getTopUpRecurringLabel() {
        return getUTFStr(topUpRecurringLabel);
    }

    public String getRecurringLabel() {
        return getUTFStr(recurringLabel);
    }

    private String getUTFStr(String rawString) {
        if (rawString != null) {
            byte[] bytes = StringUtils.getBytesUtf8(rawString);
            return StringUtils.newStringUtf8(bytes);
        }
        return "";
    }
}