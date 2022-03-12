package com.lebara.core.models.beans;

import com.fasterxml.jackson.annotation.JsonInclude;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Model(adaptables = {Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class MyProfileChangeAddressPopup {

    @ValueMapValue
    private String changeAddressLabel;

    @ValueMapValue
    private String changeAddressDesc;

    @ValueMapValue
    private String yourAddressPlaceholder;

    @ValueMapValue
    private String manualAddressLabel;

    @ValueMapValue
    private String typeAddressLabel;

    @ValueMapValue
    private String successTitle;

    @ValueMapValue
    private String successDesc;

    public String getChangeAddressLabel() { return changeAddressLabel; }

    public String getChangeAddressDesc() { return changeAddressDesc; }

    public String getYourAddressPlaceholder() { return yourAddressPlaceholder; }

    public String getManualAddressLabel() { return manualAddressLabel; }

    public String getTypeAddressLabel() { return typeAddressLabel; }

    public String getSuccessTitle() { return successTitle; }

    public String getSuccessDesc() { return successDesc; }
}
