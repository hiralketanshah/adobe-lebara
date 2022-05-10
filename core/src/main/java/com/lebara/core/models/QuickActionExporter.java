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

@Model(adaptables = SlingHttpServletRequest.class, adapters = {QuickActionExporter.class, ComponentExporter.class},
        resourceType = QuickActionExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class QuickActionExporter implements ComponentExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/quickaction";

    @ValueMapValue
    private String cardBackgroundColor;

    @ChildResource
    private List<SelectionBean> cards;

    public String getCardBackgroundColor() {
        return cardBackgroundColor;
    }

    public List<SelectionBean> getCards() {
        return cards;
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
