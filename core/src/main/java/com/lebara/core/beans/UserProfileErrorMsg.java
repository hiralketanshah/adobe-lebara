package com.lebara.core.beans;

import com.fasterxml.jackson.annotation.JsonInclude;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Model(adaptables = {Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class UserProfileErrorMsg {

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
    private String altContactNumberRequiredMsg;

    @ValueMapValue
    private String alternativeNumberInValidMsg;

    @ValueMapValue
    public String zipCodeErrorMax;

    @ValueMapValue
    public String zipCodeErrorMin;

    @ValueMapValue
    public String zipCodeErrorRequired;

    @ValueMapValue
    public String zipCodeErrorPattern;

    @ValueMapValue
    public String cityErrorMax;

    @ValueMapValue
    public String cityErrorRequired;

    @ValueMapValue
    public String houseNumberErrorMax;

    @ValueMapValue
    public String houseNumberErrorRequired;

    @ValueMapValue
    public String houseNumberErrorPattern;

    @ValueMapValue
    public String streetLabelErrorMax;

    @ValueMapValue
    public String streetLabelErrorRequired;

    @ValueMapValue
    public String streetLabelErrorPattern;

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

    public String getEmailRequiredMsg() {
        return emailRequiredMsg;
    }

    public String getEmailInValidMsg() {
        return emailInValidMsg;
    }

    public String getAltContactNumberRequiredMsg() { return altContactNumberRequiredMsg; }

    public String getAlternativeNumberInValidMsg() { return alternativeNumberInValidMsg; }

    public String getZipCodeErrorMax() {
        return zipCodeErrorMax;
    }

    public String getZipCodeErrorMin() {
        return zipCodeErrorMin;
    }

    public String getZipCodeErrorRequired() {
        return zipCodeErrorRequired;
    }

    public String getZipCodeErrorPattern() {
        return zipCodeErrorPattern;
    }

    public String getCityErrorMax() {
        return cityErrorMax;
    }

    public String getCityErrorRequired() {
        return cityErrorRequired;
    }
    public String getHouseNumberErrorMax() {
        return houseNumberErrorMax;
    }

    public String getHouseNumberErrorRequired() {
        return houseNumberErrorRequired;
    }

    public String getHouseNumberErrorPattern() {
        return houseNumberErrorPattern;
    }

    public String getStreetLabelErrorMax() {
        return streetLabelErrorMax;
    }

    public String getStreetLabelErrorRequired() {
        return streetLabelErrorRequired;
    }

    public String getStreetLabelErrorPattern() {
        return streetLabelErrorPattern;
    }

}
