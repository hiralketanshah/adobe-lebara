package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.lebara.core.dto.SelectBean;
import com.lebara.core.utils.CFUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.List;

@Model(adaptables = SlingHttpServletRequest.class, adapters = {PersonalDetailsExporter.class, ComponentExporter.class},
        resourceType = PersonalDetailsExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class PersonalDetailsExporter implements ComponentExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/personaldetails";

    @SlingObject
    private ResourceResolver resourceResolver;

    @ValueMapValue
    public String yourPersonalDetailsLabel;
    @ValueMapValue
    public String firstNameLabel;
    @ValueMapValue
    public String firstNamePlaceholder;
    @ValueMapValue
    public String firstNameErrorRequired;
    @ValueMapValue
    public String firstNameErrorPattern;
    @ValueMapValue
    public String lastNameLabel;
    @ValueMapValue
    public String lastNameErrorRequired;
    @ValueMapValue
    public String lastNameErrorPattern;
    @ValueMapValue
    public String lastNamePlaceholder;
    @ValueMapValue
    public String emailAddressLabel;
    @ValueMapValue
    public String emailErrorMax;
    @ValueMapValue
    public String emailErrorRequired;
    @ValueMapValue
    public String emailErrorPattern;
    @ValueMapValue
    public String emailAddressPlaceholder;
    @ValueMapValue
    public String keyInAddress;
    @ValueMapValue
    public String addressLabel;
    @ValueMapValue
    public String addressErrorRequired;
    @ValueMapValue
    public String addressKeyInText;
    @ValueMapValue
    public String postalcodePlaceholder;
    @ValueMapValue
    public String enterAddressManually;
    @ValueMapValue
    public String changeAddressLabel;
    @ValueMapValue
    public String streetLabel;
    @ValueMapValue
    public String streetLabelErrorMax;
    @ValueMapValue
    public String streetLabelErrorRequired;
    @ValueMapValue
    public String streetLabelErrorPattern;
    @ValueMapValue
    public String streetPlaceholder;
    @ValueMapValue
    public String houseNumberLabel;
    @ValueMapValue
    public String houseNumberErrorMax;
    @ValueMapValue
    public String houseNumberErrorRequired;
    @ValueMapValue
    public String houseNumberErrorPattern;
    @ValueMapValue
    public String houseNumberPlaceholder;
    @ValueMapValue
    public String zipCodeLabel;
    @ValueMapValue
    public String zipCodeErrorMax;
    @ValueMapValue
    public String zipCodeErrorMin;
    @ValueMapValue
    public String zipCodeErrorRequired;
    @ValueMapValue
    public String zipCodeErrorPattern;
    @ValueMapValue
    public String zipCodePlaceholder;
    @ValueMapValue
    public String cityLabel;
    @ValueMapValue
    public String cityErrorMax;
    @ValueMapValue
    public String cityErrorRequired;
    @ValueMapValue
    public String cityPlaceholder;
    @ValueMapValue
    public String saveAddress;
    @ValueMapValue
    public String orderDetailsCta;
    @ValueMapValue
    public String paymentCta;
    @ValueMapValue
    public String existingUserErrorMsg;
    @ValueMapValue
    public String passwordField;
    @ValueMapValue
    public String confirmPasswordField;
    @ValueMapValue
    public String enterPasswordLabel;
    @ValueMapValue
    public String confirmPasswordLabel;
    @ValueMapValue
    public String minimumCharactersLabel;
    @ValueMapValue
    public String samePasswordLabel;
    @ValueMapValue
    public String showPasswordLabel;
    @ValueMapValue
    public String hidePasswordLabel;
    @ValueMapValue
    private String cfPath;

    public List<SelectBean> getCities(){
        return CFUtils.populateCityInfo(resourceResolver.getResource(cfPath));
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
