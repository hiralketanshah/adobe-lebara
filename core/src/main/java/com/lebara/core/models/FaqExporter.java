package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.lebara.core.models.beans.Option;
import com.lebara.core.utils.AemUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.Collections;
import java.util.List;

@Model(adaptables = SlingHttpServletRequest.class, adapters = {FaqExporter.class, ComponentExporter.class},
        resourceType = FaqExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class FaqExporter extends HeadingExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/faq";

    @ScriptVariable
    private Resource resource;

    @ValueMapValue
    private boolean showStructuredData;

    @ChildResource
    private List<Option> options;

    @ValueMapValue
    private String backgroundColor;

    @ValueMapValue
    private String answer;

    @SlingObject
    private SlingHttpServletRequest slingRequest;

    public boolean isShowStructuredData() {
        return showStructuredData;
    }

    public List<Option> getOptions() {
        return (options == null) ? Collections.emptyList() : options;
    }

    public String getBackgroundColor() { return backgroundColor; }

    public String getAnswer() {
        return AemUtils.updateShortenLinksInRichText(answer,slingRequest);
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
