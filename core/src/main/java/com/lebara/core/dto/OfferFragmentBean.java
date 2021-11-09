package com.lebara.core.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;

import java.text.DecimalFormat;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class OfferFragmentBean {
    private String id;
    private String offerType;
    private String cost;
    private String planName;
    private String validity;
    private String validityText;
    private String dataVolumeText;
    private String minutesToCountriesText;
    private PlanInfo planInfo;
    private String additionalOffers;
    private List<CFAllowance> allowanceList;

    public String getPlanName() {
        return planName;
    }

    public void setPlanName(String planName) {
        this.planName = planName;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOfferType() {
        return offerType;
    }

    public void setOfferType(String offerType) {
        this.offerType = offerType;
    }

    public String getCost() {
        if (NumberUtils.isCreatable(cost)) {
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

    public String getValidityText() {
        return validityText;
    }

    public void setValidityText(String validityText) {
        this.validityText = validityText;
    }

    public String getDataVolumeText() {
        return dataVolumeText;
    }

    public void setDataVolumeText(String dataVolumeText) {
        this.dataVolumeText = dataVolumeText;
    }

    public String getMinutesToCountriesText() {
        return minutesToCountriesText;
    }

    public void setMinutesToCountriesText(String minutesToCountriesText) {
        this.minutesToCountriesText = minutesToCountriesText;
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

    public String getAdditionalOffers() {
        return additionalOffers;
    }

    public void setAdditionalOffers(String additionalOffers) {
        this.additionalOffers = additionalOffers;
    }
}
