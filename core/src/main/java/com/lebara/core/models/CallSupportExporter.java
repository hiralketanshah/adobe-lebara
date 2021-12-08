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

@Model(adaptables = SlingHttpServletRequest.class, adapters = {CallSupportExporter.class,
        ComponentExporter.class}, resourceType = CallSupportExporter.RESOURCE_TYPE_CALL_SUPPORT, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class CallSupportExporter extends EmailSupportExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE_CALL_SUPPORT = "lebara/components/callsupport";

    @ScriptVariable
    private Resource resource;

    @ValueMapValue
    private String separatorText;

    @ValueMapValue
    private String callbackMessageText;

    public String getCallbackMessageText() {
        return callbackMessageText;
    }

    public String getSeparatorText() {
        return separatorText;
    }

    @Override
    public String getExportedType() {
        return resource.getResourceType();
    }


}