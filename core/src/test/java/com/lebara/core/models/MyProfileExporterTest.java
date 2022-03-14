package com.lebara.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class MyProfileExporterTest {

    private final AemContext aemContext = new AemContext();
    private static final String PROPERTIES_JSON = "/content/lebara/de/de/my-profile/jcr:content/root/responsivegrid/myprofile";

    @BeforeEach
    void setUp() {
        aemContext.addModelsForClasses(MyProfileExporter.class);
        aemContext.load().json("/my-profile.json", "/content/lebara/de/de/my-profile");
    }


    @Test
    void getValidationMessages() {
        aemContext.currentResource(PROPERTIES_JSON);
        MyProfileExporter myProfileExporter = aemContext.request().adaptTo(MyProfileExporter.class);
        myProfileExporter.getExportedType();
        myProfileExporter.getFrmFields();
        myProfileExporter.getSuccessEmailModal();
        myProfileExporter.getDescription();
        myProfileExporter.getSectionUsernameHeading();
        myProfileExporter.getSectionEmailPasswordHeading();
        myProfileExporter.getSectionAddressHeading();
        myProfileExporter.getSectionConsentHeading();
        myProfileExporter.getHeading();
        myProfileExporter.getChangeEmailHeading();
        myProfileExporter.getChangePasswordSuccessMsg();
        myProfileExporter.getChangeAddressPopup();
        myProfileExporter.getChangeAddressButtonLabel();
    }

}