package com.lebara.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;


import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.fasterxml.jackson.annotation.JsonUnwrapped;
import com.lebara.core.models.beans.VerifyRegisterMobileBean;

@Model(adaptables = SlingHttpServletRequest.class, adapters = { VerifyRegisterMobileExporter.class,
        ComponentExporter.class }, resourceType = VerifyRegisterMobileExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class VerifyRegisterMobileExporter implements ComponentExporter {

    protected static final String RESOURCE_TYPE = "lebara/components/verifymobile";

    @SlingObject
    private SlingHttpServletRequest slingRequest;

    @SlingObject
    private ResourceResolver resourceResolver;

    @ScriptVariable
    private Resource resource;

    @JsonUnwrapped
    public VerifyRegisterMobileBean getVerifyMobileNumberModal() {
        return resource.adaptTo(VerifyRegisterMobileBean.class);
    }

    @Override
    public String getExportedType() {
        return resource.getResourceType();
    }
}
