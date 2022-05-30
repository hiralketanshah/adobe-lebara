package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.lebara.core.utils.AemUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;


@Model(adaptables = SlingHttpServletRequest.class, adapters = {ResetPasswordExporter.class, ComponentExporter.class},
        resourceType = ResetPasswordExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class ResetPasswordExporter implements ComponentExporter {

    protected static final String RESOURCE_TYPE = "lebara/components/resetpassword";
    
    @SlingObject
    private SlingHttpServletRequest slingRequest;

    @SlingObject
    private ResourceResolver resourceResolver;

    @ScriptVariable
    private Resource resource;

    /**
     * Reset Password Form Fields
     */
    @ValueMapValue
    private String resetPwdTitle;

    @ValueMapValue
    private String resetPwdDescription;

    @ValueMapValue
    private String resetPwdEmailLabel;

    @ValueMapValue
    private String resetPwdMobileLabel;

    @ValueMapValue
    private String resetPwdButtonLabel;

    @ValueMapValue
    private String resetPwdButtonCancelLabel;

    @ValueMapValue
    private String emptyMobileError;

    @ValueMapValue
    private String invalidMobileError;

    public String getEmptyMobileError() {
        return emptyMobileError;
    }

    public String getInvalidMobileError() {
        return invalidMobileError;
    }

    public String getResetPwdTitle() {
        return resetPwdTitle;
    }

    public String getResetPwdDescription() {
        return AemUtils.updateShortenLinksInRichText(resetPwdDescription, slingRequest);
    }

    public String getResetPwdEmailLabel() {
        return resetPwdEmailLabel;
    }

    public String getResetPwdMobileLabel() {
        return resetPwdMobileLabel;
    }

    public String getResetPwdButtonLabel() {
        return resetPwdButtonLabel;
    }

    public String getResetPwdButtonCancelLabel() {
        return resetPwdButtonCancelLabel;
    }

    @Override
    public String getExportedType() {
        return resource.getResourceType();
    }
}
