package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.lebara.core.utils.AemUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.ArrayList;
import java.util.List;

@Model(adaptables = SlingHttpServletRequest.class, adapters = {PrepaidPlansExporter.class, ComponentExporter.class},
        resourceType = PrepaidPlansExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class PrepaidPlansExporter extends HeadingExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/dashboard/prepaidplans";

    @ChildResource
    private Resource tabs;

    @ValueMapValue
    private String manageLabel;

    @ValueMapValue
    private String leftOfText;

    private List<String> plansTabNames;

    public String getManageLabel() {
        return manageLabel;
    }

    public String getLeftOfText() {
        return leftOfText;
    }

    public List<String> getPlansTabNames() {
        plansTabNames = new ArrayList<>();
        if (tabs != null) {
            for (Resource tab : tabs.getChildren()) {
                plansTabNames.add(AemUtils.getStringProperty(tab, "tabsName"));
            }
        }
        return plansTabNames;
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
