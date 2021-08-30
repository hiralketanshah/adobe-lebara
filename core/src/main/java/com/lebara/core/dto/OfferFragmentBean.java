package com.lebara.core.dto;

public class OfferFragmentBean {
    private String cost;
    private String validity;
    private String allowances;
    private PlanInfo planInfo;

    public String getCost() {
        return cost;
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

    public String getAllowances() {
        return allowances;
    }

    public void setAllowances(String allowances) {
        this.allowances = allowances;
    }

    public PlanInfo getPlanInfo() { return planInfo; }

    public void setPlanInfo(PlanInfo planInfo) {
        this.planInfo = planInfo;
    }
}
