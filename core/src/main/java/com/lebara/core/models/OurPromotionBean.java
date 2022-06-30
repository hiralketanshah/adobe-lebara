package com.lebara.core.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.lebara.core.utils.AemUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class OurPromotionBean {

    @SlingObject
    private SlingHttpServletRequest request;

    @ValueMapValue
    private String heading;

    @ValueMapValue
    private String subHeading;

    @ValueMapValue
    private String image;

    @ValueMapValue
    private String buttonLabel;

    @ValueMapValue
    private String buttonLink;

    public String getHeading() {
        return heading;
    }

    public String getSubHeading() {
        return subHeading;
    }

    public String getImage() {
        return image;
    }

    public String getButtonLabel() {
        return buttonLabel;
    }

    public String getButtonLink() {
        return AemUtils.getLinkWithExtension(buttonLink, request);
    }


}
