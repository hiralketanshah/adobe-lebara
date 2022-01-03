package com.lebara.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class CreateNewPasswordExporterTest {
     final AemContext aemContext = new AemContext();
    private static final String PROPERTIES_JSON = "/content/lebara/de/de/create-new-password/jcr:content/root/responsivegrid/createnewpassword";

    @BeforeEach
    void setUp() {
        aemContext.addModelsForClasses(CreateNewPasswordExporter.class);
        aemContext.load().json("/create-new-password.json", "/content/lebara/de/de/create-new-password");
    }

    @Test
    void getAlertSuccessSuffixMsgTest() {
        aemContext.currentResource(PROPERTIES_JSON);
        CreateNewPasswordExporter createNewPasswordExporter = aemContext.request().adaptTo(CreateNewPasswordExporter.class);
        createNewPasswordExporter.getAlertSuccessSuffixMsg();
        createNewPasswordExporter.getCompHeading();
        createNewPasswordExporter.getCompHeadingDescription();
        createNewPasswordExporter.getFrmLabelPin();
        createNewPasswordExporter.getCompResendPinText();
        createNewPasswordExporter.getFrmLabelNewPwd();
        createNewPasswordExporter.getPwdMinHint();
        createNewPasswordExporter.getFrmLabelReEnterNewPwd();
        createNewPasswordExporter.getShowLabel();
        createNewPasswordExporter.getHideLabel();
        createNewPasswordExporter.getFrmBtnPrimaryLabel();
        createNewPasswordExporter.getFrmBtnPrimaryLabel();
        createNewPasswordExporter.getRegistrationCtaLink();
        createNewPasswordExporter.getPinRequiredValidationMsg();
        createNewPasswordExporter.getPinLengthValidationMsg();
        createNewPasswordExporter.getPwdRequiredValidationMsg();
        createNewPasswordExporter.getPwdMinValdiationMsg();
        createNewPasswordExporter.getPwdConfirmRequiredValidationMsg();
        createNewPasswordExporter.getPwdConfirmMatchValidationMsg();
        createNewPasswordExporter.getExportedType();
    }
}