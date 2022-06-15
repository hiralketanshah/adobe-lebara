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
public class AttachSimBean {

    @ValueMapValue
    private String heading;

    @ValueMapValue
    private String description;

    @ValueMapValue
    private String noSimLable;

    @ValueMapValue
    private String keyMobileSim;

    @ValueMapValue
    private String simAttachInfo;

    @ChildResource
    private AttachSimPopupFormFields frmFields;

    @JsonProperty("frmFields")
    public AttachSimPopupFormFields getFrmFields() {
        return frmFields;
    }

    public String getHeading() {
        return heading;
    }

    public String getDescription() {
        return description;
    }

    public String getNoSimLable() {
        return noSimLable;
    }

    public String getKeyMobileSim() {
        return keyMobileSim;
    }

    public String getSimAttachInfo() {
        return simAttachInfo;
    }
}
