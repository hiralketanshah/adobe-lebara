package com.lebara.core.models;

import java.util.Optional;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.style.ComponentStyleInfo;
import com.lebara.core.utils.AemUtils;

@Model(adaptables = SlingHttpServletRequest.class, adapters = { AddressDetailsExporter.class,
        ComponentExporter.class }, resourceType = AddressDetailsExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class AddressDetailsExporter implements ComponentExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/nl/addressdetails";

    @SlingObject
    Resource resource;
    @ValueMapValue
    private String streetInvalidCharErrorMessage;
    @ValueMapValue
    private String streetCharLimitErrorMessage;
    @ValueMapValue
    private String houseNumberEmptyErrorMessage;
    @ValueMapValue
    private String streetLabel;
    @ValueMapValue
    private String houseNumberCharLimitErrorMessage;
    @ValueMapValue
    private String postcodeInvalidCharErrorMessage;
    @ValueMapValue
    private String postCodeLabel;
    @ValueMapValue
    private String postCodeEmptyErrorMessage;
    @ValueMapValue
    private String cityCharLimitErrorMessage;
    @ValueMapValue
    private String continueButtonLabel;
    @ValueMapValue
    private String searchAddressLabel;
    @ValueMapValue
    private String continueCTALink;
    @ValueMapValue
    private String houseNumberInvalidCharErrorMessage;
    @ValueMapValue
    private String cityEmptyErrorMessage;
    @ValueMapValue
    private String postCodePlaceholder;
    @ValueMapValue
    private String enterAddressManually;
    @ValueMapValue
    private String postCodeMinCharErrorMessage;
    @ValueMapValue
    private String postCodeMaxCharErrorMessage;
    @ValueMapValue
    private String addressListModalHeading;
    @ValueMapValue
    private String houseNumberLabel;
    @ValueMapValue
    private String streetPlaceholder;
    @ValueMapValue
    private String cityPlaceholder;
    @ValueMapValue
    private String streetEmptyErrorMessage;
    @ValueMapValue
    private String cityLabel;
    @ValueMapValue
    private String keyInAddress;
    @ValueMapValue
    private String houseNumberPlaceholder;

    private String appliedStyles;

    public String getStreetInvalidCharErrorMessage() {
        return streetInvalidCharErrorMessage;
    }

    public String getStreetCharLimitErrorMessage() {
        return streetCharLimitErrorMessage;
    }

    public String getHouseNumberEmptyErrorMessage() {
        return houseNumberEmptyErrorMessage;
    }

    public String getStreetLabel() {
        return streetLabel;
    }

    public String getHouseNumberCharLimitErrorMessage() {
        return houseNumberCharLimitErrorMessage;
    }

    public String getPostcodeInvalidCharErrorMessage() {
        return postcodeInvalidCharErrorMessage;
    }

    public String getPostCodeLabel() {
        return postCodeLabel;
    }

    public String getPostCodeEmptyErrorMessage() {
        return postCodeEmptyErrorMessage;
    }

    public String getCityCharLimitErrorMessage() {
        return cityCharLimitErrorMessage;
    }

    public String getContinueButtonLabel() {
        return continueButtonLabel;
    }

    public String getSearchAddressLabel() {
        return searchAddressLabel;
    }

    public String getContinueCTALink() {
        return AemUtils.getLinkWithExtension(continueCTALink);
    }

    public String getHouseNumberInvalidCharErrorMessage() {
        return houseNumberInvalidCharErrorMessage;
    }

    public String getCityEmptyErrorMessage() {
        return cityEmptyErrorMessage;
    }

    public String getPostCodePlaceholder() {
        return postCodePlaceholder;
    }

    public String getEnterAddressManually() {
        return enterAddressManually;
    }

    public String getPostCodeMinCharErrorMessage() {
        return postCodeMinCharErrorMessage;
    }

    public String getPostCodeMaxCharErrorMessage() {
        return postCodeMaxCharErrorMessage;
    }

    public String getAddressListModalHeading() {
        return addressListModalHeading;
    }

    public String getHouseNumberLabel() {
        return houseNumberLabel;
    }

    public String getStreetPlaceholder() {
        return streetPlaceholder;
    }

    public String getCityPlaceholder() {
        return cityPlaceholder;
    }

    public String getStreetEmptyErrorMessage() {
        return streetEmptyErrorMessage;
    }

    public String getCityLabel() {
        return cityLabel;
    }

    public String getKeyInAddress() {
        return keyInAddress;
    }

    public String getHouseNumberPlaceholder() {
        return houseNumberPlaceholder;
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