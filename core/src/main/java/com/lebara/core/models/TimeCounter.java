package com.lebara.core.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = { Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class TimeCounter {

    @ValueMapValue
    private String label2;

    public String getLabel2() {
        return label2;
    }
}
