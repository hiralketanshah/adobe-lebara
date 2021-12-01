package com.lebara.core.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.lebara.core.utils.AemUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.apache.sling.api.SlingHttpServletRequest;

import java.text.DecimalFormat;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class InternationalRateBean {
    private String countryLandingPageUrl;
    private String countryName;
    private String landlineRates;
    private String mobileCallRate;
    private String smsRate;

    public InternationalRateBean(String countryLandingPageUrl, String countryName, String landlineRates, String mobileCallRate, String smsRate) {
        this.countryLandingPageUrl = countryLandingPageUrl;
        this.countryName = countryName;
        this.landlineRates = landlineRates;
        this.mobileCallRate = mobileCallRate;
        this.smsRate = smsRate;
    }

    public String getCountryLandingPageUrl() {
        return countryLandingPageUrl;
    }

    public void setCountryLandingPageUrl(String countryLandingPageUrl) {
        this.countryLandingPageUrl = countryLandingPageUrl;
    }

    public String getCountryName() {
        return countryName;
    }

    public void setCountryName(String countryName) {
        this.countryName = countryName;
    }

    public String getLandlineRates() {
        return landlineRates;
    }

    public void setLandlineRates(String landlineRates) {
        this.landlineRates = landlineRates;
    }

    public String getMobileCallRate() {
        return mobileCallRate;
    }

    public void setMobileCallRate(String mobileCallRate) {
        this.mobileCallRate = mobileCallRate;
    }

    public String getSmsRate() {
        return smsRate;
    }

    public void setSmsRate(String smsRate) {
        this.smsRate = smsRate;
    }
}
