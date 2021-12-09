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
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Model(adaptables = SlingHttpServletRequest.class, adapters = {UsageDetailsExporter.class, ComponentExporter.class},
        resourceType = UsageDetailsExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class UsageDetailsExporter extends HeadingExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/usagedetails";

    @SlingObject
    private SlingHttpServletRequest request;

    @ChildResource
    private Resource tabs;

    @ValueMapValue
    private String description;
    @ValueMapValue
    private String ctaSeeMoreCallsLabel;
    @ValueMapValue
    private String ctaLoadMoreLabel;
    @ValueMapValue
    private String ctaSeeMoreURL;

    private List<String> tabsName;

    public String getDescription() {
        return description;
    }

    public String getCtaSeeMoreCallsLabel() {
        return ctaSeeMoreCallsLabel;
    }

    public String getCtaLoadMoreLabel() {
        return ctaLoadMoreLabel;
    }

    public String getCtaSeeMoreURL() {
        return AemUtils.getLinkWithExtension(ctaSeeMoreURL, request);
    }

    public List<String> getTabsName() {
        tabsName = new ArrayList<>();
        if (tabs != null) {
            for (Resource tab : tabs.getChildren()) {
                tabsName.add(AemUtils.getStringProperty(tab, "tabsName"));
            }
        }
        return tabsName == null ? Collections.emptyList() : Collections.unmodifiableList(tabsName);
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
