package com.lebara.core.beans;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Model(adaptables = {Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class OrderPaymentHistoryFormFields {
	

    @SlingObject
    private ResourceResolver resourceResolver;

    @ValueMapValue
    private String shopNowCTA;

    @ValueMapValue
    private String emptyOrderLabel;

    @ValueMapValue
    private String orderHistoryEmptyLabel;

    @ValueMapValue
    private String backgroundImage;

    @ValueMapValue
    private String monthLabel;

    @ValueMapValue
    private String transactionSummery;

    @ValueMapValue
    private String numberHistoryLabel;

    @ValueMapValue
    private String historyLabel;

    @ValueMapValue
    private String cancelCTALabel;

    @ValueMapValue
    private String continueCTALabel;

    @ValueMapValue
    private String mobileNumberPlaceholder;

    @ValueMapValue
    private String mobileNumberLabel;

    @ValueMapValue
    private String toLabel;

    @ValueMapValue
    private String fromLabel;

    @ValueMapValue
    private String modalTitle;

    @ValueMapValue
    private String filterLabel;

    public String getShopNowCTA() {
        return shopNowCTA;
    }

    public String getEmptyOrderLabel() {
        return emptyOrderLabel;
    }

    public String getOrderHistoryEmptyLabel() {
        return orderHistoryEmptyLabel;
    }

    public String getBackgroundImage() {
        return backgroundImage;
    }

    public String getMonthLabel() {
        return monthLabel;
    }

    public String getTransactionSummery() {
        return transactionSummery;
    }

    public String getNumberHistoryLabel() {
        return numberHistoryLabel;
    }

    public String getHistoryLabel() {
        return historyLabel;
    }

    public String getCancelCTALabel() {
        return cancelCTALabel;
    }

    public String getContinueCTALabel() {
        return continueCTALabel;
    }

    public String getMobileNumberPlaceholder() {
        return mobileNumberPlaceholder;
    }

    public String getMobileNumberLabel() {
        return mobileNumberLabel;
    }

    public String getToLabel() {
        return toLabel;
    }

    public String getFromLabel() {
        return fromLabel;
    }

    public String getModalTitle() {
        return modalTitle;
    }

    public String getFilterLabel() {
        return filterLabel;
    }
}