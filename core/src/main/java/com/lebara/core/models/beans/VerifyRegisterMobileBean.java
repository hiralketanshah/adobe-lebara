package com.lebara.core.models.beans;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.lebara.core.models.TimeCounter;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Model(adaptables = {Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class VerifyRegisterMobileBean {

    @ValueMapValue
    private String heading;

    @ValueMapValue
    private String subHeading;

    @ValueMapValue
    private Double initalCountdownValue;

    @ChildResource
    private PageFormFields frmFields;

    @ChildResource
    private PostpaidPersonalDetailsErrorMsg validationMessages;

    @ChildResource
    private SuccessMessage successMessages;

    @ChildResource
    private TimeCounter timeCounter;

    public String getHeading() {
        return heading;
    }

    public String getSubHeading() {
        return subHeading;
    }

    public PageFormFields getFrmFields() {
        return frmFields;
    }

    public PostpaidPersonalDetailsErrorMsg getValidationMessages() {
        return validationMessages;
    }

    public TimeCounter getTimeCounter() {
        return timeCounter;
    }

    public SuccessMessage getSuccessMessages() {
        return successMessages;
    }

    public Double getInitalCountdownValue() {
        return initalCountdownValue;
    }
}
