package com.lebara.core.models.beans;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Model(adaptables = {Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ActivateSimBean {

    @ValueMapValue
    private String heading;

    @ValueMapValue
    private String description;

    @ChildResource
    private ActivateSimPopupFormFields frmFields;

    @JsonProperty("frmFields")
    public ActivateSimPopupFormFields getFrmFields() {
        return frmFields;
    }

    public String getHeading() {
        return heading;
    }

    public String getDescription() {
        return description;
    }
}
