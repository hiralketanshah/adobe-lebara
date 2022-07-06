package com.lebara.core.models.beans;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.lebara.core.utils.AemUtils;

import java.util.HashMap;
import java.util.Map;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Model(adaptables = {Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class VerifyRegisterMobileBean {
    private static final String LABEL2 = "label2";
    /**
     * Verify Mobile Number Fields
     */
    @ValueMapValue
    private String heading;

    @ValueMapValue
    private String subHeading;

    @ValueMapValue
    private Double initalCountdownValue;

    // @ChildResource
    // private PostpaidPersonalDetailsFormFields frmFields;

    @ChildResource
    private PostpaidPersonalDetailsErrorMsg validationMessages;

    @ChildResource
    private SuccessMessage successMessages;

    @ChildResource
    private Resource timeCounter;

    public String getHeading() {
        return heading;
    }

    public String getSubHeading() {
        return subHeading;
    }

    // public PostpaidPersonalDetailsFormFields getFrmFields() {
    //     return frmFields;
    // }

    public PostpaidPersonalDetailsErrorMsg getValidationMessages() {
        return validationMessages;
    }

     public Map<String, String> getTimeCounter() {
         Map<String, String> timeCounterMap = new HashMap<>();
         if (timeCounter != null) {
             timeCounterMap.put(LABEL2, AemUtils.getStringProperty(timeCounter, LABEL2));
         }
         return timeCounterMap;
     }

    public SuccessMessage getSuccessMessages() {
        return successMessages;
    }

    public Double getInitalCountdownValue() {
        return initalCountdownValue;
    }
}
