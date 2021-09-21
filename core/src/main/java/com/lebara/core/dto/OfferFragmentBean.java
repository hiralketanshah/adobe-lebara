package com.lebara.core.dto;

import org.apache.commons.lang3.StringUtils;

import java.text.DecimalFormat;
import java.util.List;

public class OfferFragmentBean {
    private String id;
    private String cost;
    private String validity;
    private PlanInfo planInfo;
    private List<String> additionalOffers;
    private List<CFAllowance> allowanceList;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCost() {
        if (StringUtils.isNumeric(cost)) {
            return new DecimalFormat("##.##").format(Float.parseFloat(cost) / 100);
        }
        return StringUtils.EMPTY;
    }

    public void setCost(String cost) {
        this.cost = cost;
    }

    public String getValidity() {
        return validity;
    }

    public void setValidity(String validity) {
        this.validity = validity;
    }

    public PlanInfo getPlanInfo() {
        return planInfo;
    }

    public void setPlanInfo(PlanInfo planInfo) {
        this.planInfo = planInfo;
    }

    public List<CFAllowance> getAllowanceList() {
        return allowanceList;
    }

    public void setAllowanceList(List<CFAllowance> allowanceList) {
        this.allowanceList = allowanceList;
    }

    public List<String> getAdditionalOffers() {
        return additionalOffers;
    }

    public void setAdditionalOffers(List<String> additionalOffers) {
        this.additionalOffers = additionalOffers;
    }
}
