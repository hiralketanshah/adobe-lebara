package com.lebara.core.models;


import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.List;

@Model(adaptables = {SlingHttpServletRequest.class, Resource.class}, adapters = {OurPromotionsExporter.class, ComponentExporter.class},
        resourceType = OurPromotionsExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class OurPromotionsExporter implements ComponentExporter{

    protected static final String RESOURCE_TYPE = "lebara/components/ourpromotions";
    @ValueMapValue
    private String title;

    @ValueMapValue
    private String label;

    @ValueMapValue
    private String link;

    @ChildResource(name = "field/.")
    public List<OurPromotionImpl> ourpromotion;

    public String getTitle() {
        return title;
    }

    public String getLabel() {
        return label;
    }

    public String getLink() {
        return link;
    }

    public List<OurPromotionImpl> getOurpromotion() {
        return ourpromotion;
    }

    @Override
    public String getExportedType() {
        return null;
    }
}
