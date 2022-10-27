package com.lebara.core.models.dashboard;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.style.ComponentStyleInfo;

import java.util.Optional;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = SlingHttpServletRequest.class, adapters = {SimSwitchExporter.class, ComponentExporter.class},
        resourceType = SimSwitchExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class SimSwitchExporter implements ComponentExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/dashboard/simswitch";

    @SlingObject
    private ResourceResolver resourceResolver;

    @SlingObject
    Resource resource;
    
    @ValueMapValue
    private String simName;

    @ValueMapValue
    private String balanceLabel;

    @ValueMapValue
    private String activeLabel;

    @ValueMapValue
    private String inActiveLabel;

    @ValueMapValue
    private String noSimAttach;

    @ValueMapValue
    private boolean showPlansWithProgress;
    
    private String appliedStyles;

    public String getSimName() {
        return simName;
    }

    public String getBalanceLabel() {
        return balanceLabel;
    }

    public String getActiveLabel() {
        return activeLabel;
    }

    public String getInActiveLabel() {
        return inActiveLabel;
    }

    public String getNoSimAttach() {
        return noSimAttach;
    }

    public boolean getShowPlansWithProgress() {
        return showPlansWithProgress;
    }

    public String getAppliedStyles() {
        return Optional.of(resource).map(resource -> resource.adaptTo(ComponentStyleInfo.class)).map(cmpStyleInfo -> cmpStyleInfo.getAppliedCssClasses()).orElse("");
    }
    
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
