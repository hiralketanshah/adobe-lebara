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

@Model(adaptables = SlingHttpServletRequest.class, adapters = {PostpaidSimValidationExporter.class, ComponentExporter.class},
        resourceType = PostpaidSimValidationExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class PostpaidSimValidationExporter implements ComponentExporter   {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/postpaidsimvalidation";

    @SlingObject
    private ResourceResolver resourceResolver;

    @ScriptVariable
    private Resource resource;

    @SlingObject
    private SlingHttpServletRequest slingRequest;

    @ValueMapValue
    private String verifySimHeading;
    @ValueMapValue
    private String verifySimSubHeading;
    @ValueMapValue
    private String continueLabel;
    @ValueMapValue
    private String pukHeading;
    @ValueMapValue
    private String pukSubHeading;
    @ValueMapValue
    private String pukPlaceHolder;

    @ValueMapValue
    private String simheading;
    @ValueMapValue
    private String simSubHeading;
    @ValueMapValue
    private String simPlaceHolder;
    @ValueMapValue
    private String countryCode;
    @ValueMapValue
    private String simimage;
    @ValueMapValue
    private String componentType;
    @ValueMapValue
    private String activationLinkURL;
    @ValueMapValue
    private String migrationLinkURL;
    @ValueMapValue
    private String emptySimCodeError;
    @ValueMapValue
    private String emptypukCodeError;
    @ValueMapValue
    private String errorIfMigrationAlreadyRequested;
    @ValueMapValue
    private String errorIfIncorrectPukOrSim;
    @ValueMapValue
    private String infographicsLabel;
    @ValueMapValue
    private String whiteSpaceErrorMessage;

    public String getVerifySimHeading() {
        return verifySimHeading;
    }

    public String getVerifySimSubHeading() {
        return verifySimSubHeading;
    }

    public String getContinueLabel() {
        return continueLabel;
    }

    public String getPukHeading() {
        return pukHeading;
    }

    public String getPukSubHeading() {
        return pukSubHeading;
    }

    public String getPukPlaceHolder() {
        return pukPlaceHolder;
    }

    public String getSimheading() {
        return simheading;
    }

    public String getSimSubHeading() {
        return simSubHeading;
    }

    public String getSimPlaceHolder() {
        return simPlaceHolder;
    }

    public String getSimimage() {
        return simimage;
    }

    public String getComponentType() {
        return componentType;
    }

    public String getActivationLinkURL() {
        return AemUtils.getLinkWithExtension(activationLinkURL, slingRequest);
    }

    public String getMigrationLinkURL() {
        return AemUtils.getLinkWithExtension(migrationLinkURL, slingRequest);
    }

    public String getEmptySimCodeError() {
        return emptySimCodeError;
    }

    public String getErrorIfMigrationAlreadyRequested() {
        return errorIfMigrationAlreadyRequested;
    }

    public String getErrorIfIncorrectPukOrSim() {
        return errorIfIncorrectPukOrSim;
    }

    public String getCountryCode() {
        return countryCode;
    }

    public String getEmptypukCodeError() {
        return emptypukCodeError;
    }

    public String getInfographicsLabel() {
        return infographicsLabel;
    }

    public String getWhiteSpaceErrorMessage() {
        return whiteSpaceErrorMessage;
    }

    @Override
    public String getExportedType() {
        return resource.getResourceType();
    }

}
