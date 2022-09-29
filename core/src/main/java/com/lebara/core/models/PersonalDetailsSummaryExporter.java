package com.lebara.core.models;

import java.util.Optional;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.style.ComponentStyleInfo;
import com.lebara.core.utils.AemUtils;

@Model(adaptables = SlingHttpServletRequest.class, adapters = { PersonalDetailsSummaryExporter.class,
        ComponentExporter.class }, resourceType = PersonalDetailsSummaryExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class PersonalDetailsSummaryExporter implements ComponentExporter {

    protected static final String RESOURCE_TYPE = "/apps/lebara/components/nl/personaldetailssummary";

    @SlingObject
    Resource resource;

    @SlingObject
    private ResourceResolver resourceResolver;

    @ValueMapValue
    private String personalDetailsLabel;

    @ValueMapValue
    private String nameLabel;

    @ValueMapValue
    private String emailLabel;

    @ValueMapValue
    private String mobileNumberLabel;

    @ValueMapValue
    private String shippingAddressLabel;

    @ValueMapValue
    private String getNewNumberText;

    @ValueMapValue
    private String editLabel;

    @ValueMapValue
    private String editCTALink;


    public String getPersonalDetailsLabel() {
        return personalDetailsLabel;
    }

    public String getNameLabel() {
        return nameLabel;
    }

    public String getEmailLabel() {
        return emailLabel;
    }

    public String geMobileNumberLabel() {
        return mobileNumberLabel;
    }

    public String getGetNewNumberText() {
        return getNewNumberText;
    }

    public String getEditLabel() {
        return editLabel;
    }

    public String getEditCTALink() {
        return AemUtils.getLinkWithExtension(editCTALink);
    }

    public String getAppliedStyles() {
        return Optional.of(resource).map(resource -> resource.adaptTo(ComponentStyleInfo.class))
                .map(cmpStyleInfo -> cmpStyleInfo.getAppliedCssClasses()).orElse("");
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }

}
