package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.Collections;
import java.util.List;

@Model(adaptables = SlingHttpServletRequest.class, adapters = { BannerExporter.class,
        ComponentExporter.class }, resourceType = BannerExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class BannerExporter implements ComponentExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/banner";

    @ScriptVariable
    private Resource resource;

    @ValueMapValue
    private String backgroundImage;

    @ValueMapValue
    private String title;

    @ValueMapValue
    private List<String> text;

    @ValueMapValue
    private String knowMoreText;

    @ValueMapValue
    private String knowMoreLink;

    public String getBackgroundImage() {
        return backgroundImage;
    }

    public String getTitle() {
        return title;
    }

    public List<String> getText() {
        return text == null ? Collections.emptyList() : Collections.unmodifiableList(text);
    }

    public String getKnowMoreText() {
        return knowMoreText;
    }

    public String getKnowMoreLink() {
        return knowMoreLink;
    }

    @Override
    public String getExportedType() {
        return resource.getResourceType();
    }
}
