package com.lebara.core.models.beans;

import com.fasterxml.jackson.annotation.JsonInclude;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Model(adaptables = {Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ActivateYourSimBean {

    @ValueMapValue
    private String title;

    @ValueMapValue
    private String subTitle;

    @ValueMapValue
    private String subTitle1;

    @ValueMapValue
    private String linkLabel;

    public String getTitle() {
        return title;
    }

    public String getSubTitle() {
        return subTitle;
    }

    public String getSubTitle1() {
        return subTitle1;
    }

    public String getLinkLabel() {
        return linkLabel;
    }
}
