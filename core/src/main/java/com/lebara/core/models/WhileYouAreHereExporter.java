package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.fasterxml.jackson.annotation.JsonInclude;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Model(adaptables = SlingHttpServletRequest.class, adapters = {WhileYouAreHereExporter.class,
        ComponentExporter.class}, resourceType = WhileYouAreHereExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class WhileYouAreHereExporter extends IntroExporter implements ComponentExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/whileyouarehere";

    @ValueMapValue
    private String ctaLiveChatLabel;

    @ValueMapValue
    private String ctaLiveChatUrl;

    @ValueMapValue
    private String separatorOrText;

    public String getCtaLiveChatLabel() { return ctaLiveChatLabel; }

    public String getCtaLiveChatUrl() { return ctaLiveChatUrl; }

    public String getSeparatorOrText() { return separatorOrText; }

     @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
