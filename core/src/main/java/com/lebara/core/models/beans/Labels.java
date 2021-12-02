package com.lebara.core.models.beans;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adapters = {Labels.class}, adaptables = {Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class Labels {

    @ValueMapValue
    private String label1;

    @ValueMapValue
    private String label2;

    public String getLabel1() {
        return label1;
    }

    public String getLabel2() {
        return label2;
    }
}
