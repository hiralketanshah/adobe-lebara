package com.lebara.core.models;

import com.lebara.core.utils.AemUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adapters = {SupportProperties.class}, adaptables = {
        Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class SupportProperties extends ImageProperties {

    @ValueMapValue
    private String ctalinklabel;

    @ValueMapValue
    private String ctalink;

    public String getCtalinklabel() {
        return ctalinklabel;
    }

    public String getCtalink() {
        return AemUtils.getLinkWithExtension(ctalink);
    }

}
