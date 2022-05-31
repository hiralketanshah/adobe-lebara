package com.lebara.core.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.lebara.core.utils.LebaraConstants;
import org.apache.commons.lang3.StringUtils;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class CountryInfo {
    private String countryName;
    private String countryCode;
    private String countryPageUrl;

    public String getCountryName() {
        return countryName;
    }

    public String getCountryCode() {
        return countryCode;
    }

    public String getCountryPageUrl() {
        return countryPageUrl;
    }

    public void setCountryName(String countryName) {
        this.countryName = countryName;
    }

    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }

    public void setCountryPageUrl(String countryPageUrl) {
        this.countryPageUrl = countryPageUrl;
    }

    public String getCountryFlag() {
        return StringUtils.isNotBlank(countryCode) ?
                LebaraConstants.COUNTRY_FLAG_DAM_PATH.concat(countryCode).concat(".png") : StringUtils.EMPTY;
    }
    
    public String getName() {
        return countryName;
    }
    
    public String getImage() {
        return getCountryFlag();
    }


}
