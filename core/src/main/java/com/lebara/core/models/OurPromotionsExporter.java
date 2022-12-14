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
    private String ourPromotion;

    @ChildResource(name="promotions")
    public List<OurPromotionBean> ourPromotionData;

    public String getOurPromotion() {
        return ourPromotion;
    }

    public List<OurPromotionBean> getOurPromotionData() {
        return ourPromotionData;
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
