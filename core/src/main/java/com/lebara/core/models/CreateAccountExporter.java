package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.lebara.core.models.beans.ImageIcon;
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

import java.util.List;

@Model(adaptables = {SlingHttpServletRequest.class, Resource.class}, adapters = {CreateAccountExporter.class, ComponentExporter.class},
        resourceType = CreateAccountExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class CreateAccountExporter extends IntroExporter {

    protected static final String RESOURCE_TYPE = "lebara/components/createaccount";

    @SlingObject
    private SlingHttpServletRequest request;

    @ValueMapValue
    private String subHeading;

    @ValueMapValue
    private String emailAddressLabel;

    @ValueMapValue
    private String passwordLabel;

    @ValueMapValue
    private String confirmPasswordLabel;

    @ValueMapValue
    private String ctaHeading;

    @ValueMapValue
    private String ctaLink;

    public String getSubHeading() {
        return subHeading;
    }

    public String getEmailAddressLabel() {
        return emailAddressLabel;
    }

    public String getPasswordLabel() {
        return passwordLabel;
    }

    public String getConfirmPasswordLabel() {
        return confirmPasswordLabel;
    }

    public String getCtaHeading() {
        return ctaHeading;
    }

    public String getCtaLink() {
        return AemUtils.getLinkWithExtension(ctaLink, request);
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
