package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.lebara.core.models.beans.SelectionBean;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.List;

@Model(adaptables = SlingHttpServletRequest.class, adapters = {SelectionExporter.class, ComponentExporter.class},
        resourceType = SelectionExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class SelectionExporter implements ComponentExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/selection";

    @ValueMapValue
    private String heading;
    @ValueMapValue
    private String subheading;
    @ChildResource
    private List<SelectionBean> card;

    public String getHeading() {
        return heading;
    }

    public String getSubheading() {
        return subheading;
    }

    public List<SelectionBean> getCard() {
        return card;
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
