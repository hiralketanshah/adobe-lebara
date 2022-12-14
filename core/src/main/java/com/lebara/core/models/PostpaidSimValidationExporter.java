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
import com.lebara.core.models.beans.ErrorMessageFields;
import java.util.Map;
import java.util.HashMap;
import java.util.List;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
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
    @ValueMapValue
    private String pukDigitsErrorMessage;
    @ValueMapValue
    private String simDigitsErrorMessage;
    @ValueMapValue
    private String iccidCountryCode;
    @ValueMapValue
    private boolean validateSim;
    @ValueMapValue
    private String swrMessage;

    @ChildResource
    private List<ErrorMessageFields> activationErrorMessages;
    public boolean getValidateSim() {
        return validateSim;
    }

    public String getswrMessage() {
        return swrMessage;
    }

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

    public String getPukDigitsErrorMessage() {
        return pukDigitsErrorMessage;
    }

    public String getSimDigitsErrorMessage() {
        return simDigitsErrorMessage;
    }

    public String getIccidCountryCode() {
        return iccidCountryCode;
    }

    public Map<String,String> getActivationErrorMessages() {
        if(activationErrorMessages != null && !activationErrorMessages.isEmpty()){
            Map<String,String> map = new HashMap<String,String>();
            activationErrorMessages.stream().forEach(item -> map.put(item.getErrorCode(), item.getErrorMessage()));
            return map;
        }
        return new HashMap<String,String>();
    }

    @Override
    public String getExportedType() {
        return resource.getResourceType();
    }

}
