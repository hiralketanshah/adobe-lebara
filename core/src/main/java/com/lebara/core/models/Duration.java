package com.lebara.core.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = {Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class Duration {

    @ValueMapValue
    private String durationPlan;

    @ValueMapValue
    private String durationPlanCost;

    public String getDurationPlan() {
        return durationPlan;
    }

    public String getDurationPlanCost() {
        return durationPlanCost;
    }
}
