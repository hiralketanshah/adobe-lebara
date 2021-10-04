package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.lebara.core.utils.AemUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.List;

@Model(adaptables = SlingHttpServletRequest.class, adapters = {MiniFooterExporter.class, ComponentExporter.class},
        resourceType = MiniFooterExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class MiniFooterExporter implements ComponentExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/mini-footer";

    @ScriptVariable
    private Resource resource;


    @ValueMapValue
    private String helpText;
    @ValueMapValue
    private String lookText;
    @ValueMapValue
    private String supportText;
    @ValueMapValue
    private String supportLink;

    public String getHelpText() {
        return helpText;
    }

    public String getLookText() {
        return lookText;
    }

    public String getSupportText() {
        return supportText;
    }

    public String getSupportLink() {
        return AemUtils.getLinkWithExtension(supportLink);
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
