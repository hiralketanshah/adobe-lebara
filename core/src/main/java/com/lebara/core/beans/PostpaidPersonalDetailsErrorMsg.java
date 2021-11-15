package com.lebara.core.beans;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = {Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class PostpaidPersonalDetailsErrorMsg {

	@ValueMapValue
    private String emailRequiredMsg;

    @ValueMapValue
    private String emailInValidMsg;

    @ValueMapValue
    private String fNameRequiredMsg;

    @ValueMapValue
    private String fNameInValidMsg;

    @ValueMapValue
    private String lNameRequiredMsg;

    @ValueMapValue
    private String lNameInValidMsg;

    @ValueMapValue
    private String dayRequiredMsg;

    @ValueMapValue
    private String dayInValidMsg;

    @ValueMapValue
    private String monthRequiredMsg;

    @ValueMapValue
    private String monthInValidMsg;

    @ValueMapValue
    private String yearRequiredMsg;

    @ValueMapValue
    private String yearInValidMsg;

    @ValueMapValue
    private String yearInvalidAgeMsg;

    @ValueMapValue
    private String shippingRequiredMsg;

    @ValueMapValue
    private String portInNumberRequiredMsg;

    @ValueMapValue
    private String portInNumberInValidMsg;

    @ValueMapValue
    private String currentProviderRequiredMsg;

    public String getfNameRequiredMsg() {
        return fNameRequiredMsg;
    }

    public String getfNameInValidMsg() {
        return fNameInValidMsg;
    }

    public String getlNameRequiredMsg() {
        return lNameRequiredMsg;
    }

    public String getlNameInValidMsg() {
        return lNameInValidMsg;
    }

    public String getEmailRequiredMsg() {return emailRequiredMsg;}

    public String getEmailInValidMsg() {
        return emailInValidMsg;
    }

    public String getDayRequiredMsg() {
        return dayRequiredMsg;
    }

    public String getDayInValidMsg() {
        return dayInValidMsg;
    }

    public String getMonthRequiredMsg() {
        return monthRequiredMsg;
    }

    public String getMonthInValidMsg() {
        return monthInValidMsg;
    }

    public String getYearRequiredMsg() {
        return yearRequiredMsg;
    }

    public String getYearInValidMsg() {
        return yearInValidMsg;
    }

    public String getYearInvalidAgeMsg() {
        return yearInvalidAgeMsg;
    }

    public String getShippingRequiredMsg() {
        return shippingRequiredMsg;
    }

    public String getPortInNumberRequiredMsg() {
        return portInNumberRequiredMsg;
    }

    public String getPortInNumberInValidMsg() {
        return portInNumberInValidMsg;
    }

    public String getCurrentProviderRequiredMsg() {
        return currentProviderRequiredMsg;
    }
}
