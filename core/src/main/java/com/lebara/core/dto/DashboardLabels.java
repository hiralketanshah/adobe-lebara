package com.lebara.core.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class DashboardLabels {
    private String dataPlanName;
    private String dataType;
    private String minPlanName;
    private String minDataType;
    private String smsPlanName;
    private String smsDataType;
    private String internationalMinPlanName;
    private String internationalMinDataType;
    private String leftOfLabel;

    public String getDataPlanName() {
        return dataPlanName;
    }

    public void setDataPlanName(String dataPlanName) {
        this.dataPlanName = dataPlanName;
    }

    public String getDataType() {
        return dataType;
    }

    public void setDataType(String dataType) {
        this.dataType = dataType;
    }

    public String getMinPlanName() {
        return minPlanName;
    }

    public void setMinPlanName(String minPlanName) {
        this.minPlanName = minPlanName;
    }

    public String getMinDataType() {
        return minDataType;
    }

    public void setMinDataType(String minDataType) {
        this.minDataType = minDataType;
    }

    public String getSmsPlanName() {
        return smsPlanName;
    }

    public void setSmsPlanName(String smsPlanName) {
        this.smsPlanName = smsPlanName;
    }

    public String getSmsDataType() {
        return smsDataType;
    }

    public void setSmsDataType(String smsDataType) {
        this.smsDataType = smsDataType;
    }

    public String getInternationalMinPlanName() {
        return internationalMinPlanName;
    }

    public void setInternationalMinPlanName(String internationalMinPlanName) {
        this.internationalMinPlanName = internationalMinPlanName;
    }

    public String getInternationalMinDataType() {
        return internationalMinDataType;
    }

    public void setInternationalMinDataType(String internationalMinDataType) {
        this.internationalMinDataType = internationalMinDataType;
    }

    public String getLeftOfLabel() {
        return leftOfLabel;
    }

    public void setLeftOfLabel(String leftOfLabel) {
        this.leftOfLabel = leftOfLabel;
    }
}
