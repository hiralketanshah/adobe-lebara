package com.lebara.core.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.Collections;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class PlanInfo {
    private String title;
    private String countryTitle;
    private String[] listPlanItem;
    private List<CountryInfo> countryList;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String[] getListPlanItem() {
        return listPlanItem;
    }

    public void setListPlanItem(String[] listPlanItem) {
        this.listPlanItem = listPlanItem;
    }

    public List<CountryInfo> getCountryList() {
        return countryList == null ? Collections.emptyList() : Collections.unmodifiableList(countryList);
    }

    public void setCountryList(List<CountryInfo> countryList) {
        this.countryList = countryList;
    }

    public String getCountryTitle() {
        return countryTitle;
    }

    public void setCountryTitle(String countryTitle) {
        this.countryTitle = countryTitle;
    }
}
