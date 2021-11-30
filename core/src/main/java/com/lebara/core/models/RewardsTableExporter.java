package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.lebara.core.models.beans.Labels;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.Collections;
import java.util.List;

@Model(adaptables = SlingHttpServletRequest.class, adapters = { RewardsTableExporter.class,
        ComponentExporter.class }, resourceType = RewardsTableExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class RewardsTableExporter extends IntroExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/rewardstable";

    @ChildResource
    private List<Labels> tableItems;

    @ValueMapValue
    private String columnHeader;

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

}
