package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.Collections;
import java.util.List;

@Model(adaptables = SlingHttpServletRequest.class, adapters = { RewardsTableExporter.class,
        ComponentExporter.class }, resourceType = RewardsTableExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class RewardsTableExporter implements ComponentExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/rewardstable";

    @ChildResource
    private List<Labels> tableItems;

    @ValueMapValue
    private String columnHeader;
    @ValueMapValue
    private String description;
    @ValueMapValue
    private String heading;

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }

    public List<Labels> getTableItems() {
        return (tableItems == null) ? Collections.emptyList() : tableItems;
    }

    public String getColumnHeader() {
        return columnHeader;
    }

    public String getDescription() {
        return description;
    }

    public String getHeading() {
        return heading;
    }
}
