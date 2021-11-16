package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.lebara.core.beans.PageInfo;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Model(adaptables = SlingHttpServletRequest.class, adapters = {HelpCenterFaqExporter.class,
        ComponentExporter.class}, resourceType = HelpCenterFaqExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class HelpCenterFaqExporter extends HeadingExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/helpcenter/faq";

    @SlingObject
    private ResourceResolver resourceResolver;

    private List<PageInfo> pageInfoList = new ArrayList<>();

    @ValueMapValue
    private String readMoreLabel;

    @ChildResource
    private List<PageInfo> faqPages;


    public String getReadMoreLabel() {
        return readMoreLabel;
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }

    public List<PageInfo> getFaqPages() {
        return (faqPages == null) ? Collections.emptyList() : faqPages;
    }

}
