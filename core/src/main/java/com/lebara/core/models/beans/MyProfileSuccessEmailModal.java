package com.lebara.core.models.beans;

import com.fasterxml.jackson.annotation.JsonInclude;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Model(adaptables = {Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class MyProfileSuccessEmailModal {

    @ValueMapValue
    private String heading;

    @ValueMapValue
    private String description;

    @ValueMapValue
    private String beforeEmailText;

    @ValueMapValue
    private String afterEmailText;

    public String getHeading() { return heading; }

    public String getDescription() { return description; }

    public String getBeforeEmailText() { return beforeEmailText; }

    public String getAfterEmailText() { return afterEmailText; }
}
