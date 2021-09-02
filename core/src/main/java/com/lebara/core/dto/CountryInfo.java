package com.lebara.core.dto;

import com.lebara.core.utils.LebaraConstants;
import org.apache.commons.lang3.StringUtils;

public class CountryInfo {
    private String countryName;
    private String countryCode;

    public String getCountryName() {
        return countryName;
    }

    public String getCountryCode() {
        return countryCode;
    }

    public String getCountryFlag() {
        return StringUtils.isNotBlank(countryCode) ?
                LebaraConstants.COUNTRY_FLAG_DAM_PATH.concat(countryCode).concat(".png") : StringUtils.EMPTY;
    }

}
