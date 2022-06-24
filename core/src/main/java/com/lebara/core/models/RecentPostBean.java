package com.lebara.core.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.lebara.core.utils.AemUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Model(adaptables = {Resource.class}, adapters = {RecentPostBean.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class RecentPostBean {

    @SlingObject
    private ResourceResolver resourceResolver;

    @ValueMapValue
    private String category;

    @ValueMapValue
    private String heading;

    @ValueMapValue
    private String image;

    @ValueMapValue
    private String date;

    @ValueMapValue
    private String articleLink;

    public String getCategory() {
        return category;
    }

    public String getHeading() {
        return heading;
    }

    public String getDate() {
        return date;
    }

    public String getImage() {
        return image;
    }

    public String getArticleLink() {
        return AemUtils.getLinkWithExtension(articleLink, resourceResolver);
    }
}
