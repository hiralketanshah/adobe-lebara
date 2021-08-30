package com.lebara.core.dto;

import java.util.List;

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
        return countryList;
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
