package com.lebara.core.models;

import com.adobe.cq.wcm.core.components.models.Teaser;
import com.lebara.core.models.beans.*;
import com.lebara.core.models.impl.AboutLebaraImpl;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
public class GenericModelsExporterTest {

    private final AemContext aemContext=new AemContext();
    private static final String PROPERTIES_JSON_ABOUT_LEBARA = "/content/lebara/de/de/coverage/jcr:content/root/responsivegrid/aboutlebara";
    private static final String PROPERTIES_JSON_ADDON = "/content/lebara/de/de/coverage/jcr:content/root/responsivegrid/addon";
    private static final String PROPERTIES_JSON_CREATE_ACCOUNT = "/content/lebara/de/de/coverage/jcr:content/root/responsivegrid/createaccount";
    private static final String PROPERTIES_JSON_CREATE_ACCOUNT_FORM_FIELD = "/content/lebara/de/de/coverage/jcr:content/root/responsivegrid/createaccount/frmFields";
    private static final String PROPERTIES_JSON_CREATE_ACCOUNT_VALIDATION = "/content/lebara/de/de/coverage/jcr:content/root/responsivegrid/createaccount/validationMessages";
    private static final String PROPERTIES_JSON_DYNAMIC_CART = "/content/lebara/de/de/coverage/jcr:content/root/responsivegrid/dynamiccart";
    private static final String PROPERTIES_JSON_REWARDS_TABLE = "/content/lebara/de/de/coverage/jcr:content/root/responsivegrid/rewardstable";
    private static final String PROPERTIES_JSON_REWARDS_TABLE_LABEL = "/content/lebara/de/de/coverage/jcr:content/root/responsivegrid/rewardstable/tableItems/item0";
    private static final String PROPERTIES_JSON_POSTPAID_PERSONAL_DATA = "/content/lebara/de/de/coverage/jcr:content/root/responsivegrid/postpaidpersonaldeta";
    private static final String PROPERTIES_JSON_POSTPAID_PERSONAL_DATA_FORM = "/content/lebara/de/de/coverage/jcr:content/root/responsivegrid/postpaidpersonaldeta/frmFields";
    private static final String PROPERTIES_JSON_POSTPAID_PERSONAL_DATA_VALIDATION = "/content/lebara/de/de/coverage/jcr:content/root/responsivegrid/postpaidpersonaldeta/validationMessages";

    @BeforeEach
    void setUp() {
        aemContext.addModelsForClasses(AboutLebara.class);
        aemContext.load().json("/coverage.json","/content/lebara/de/de/coverage");
    }

    @Test
    final void getAboutLebaraProps(){
        aemContext.currentResource(PROPERTIES_JSON_ABOUT_LEBARA);
        AboutLebaraImpl aboutLebara = aemContext.request().adaptTo(AboutLebaraImpl.class);
        aboutLebara.getBackgroundColor();
        aboutLebara.getImagePath();
        aboutLebara.getActionsNew();
        aboutLebara.getActions();
        aboutLebara.getExportedType();
        aboutLebara.getLinkURL();
    }

    @Test
    final void getAddonProps(){
        aemContext.currentResource(PROPERTIES_JSON_ADDON);
        AddOnExporter addOnExporter = aemContext.request().adaptTo(AddOnExporter.class);
        addOnExporter.getAllPlansTabLabel();
        addOnExporter.getExportedType();
        addOnExporter.getFlexiPlanOffers();
        addOnExporter.getIntlCallsTabLabel();
        addOnExporter.getAddOnTabLabel();
        addOnExporter.getIntlPlanOffers();
        addOnExporter.getFlexiCallsTabLabel();

    }

    @Test
    final void getCreateAccountProps(){
        aemContext.currentResource(PROPERTIES_JSON_CREATE_ACCOUNT);
        CreateAccountExporter createAccountExporter = aemContext.request().adaptTo(CreateAccountExporter.class);
        createAccountExporter.getExportedType();
        createAccountExporter.getFrmFields();
        createAccountExporter.getSubHeading();
        createAccountExporter.getValidationMessages();
    }

    @Test
    final void getCreateAccountFormProps(){
        aemContext.currentResource(PROPERTIES_JSON_CREATE_ACCOUNT_FORM_FIELD);
        FormFields formFields = aemContext.request().getResource().adaptTo(FormFields.class);
        formFields.getConfirmPasswordLabel();
        formFields.getCtaButtonLabel();
        formFields.getEmailLabel();
        formFields.getEmailPlaceholder();
        formFields.getMobileLabel();
        formFields.getMobilePlaceholder();
        formFields.getPasswordLabel();
    }

    @Test
    final void getCreateAccountValidationProps(){
        aemContext.currentResource(PROPERTIES_JSON_CREATE_ACCOUNT_VALIDATION);
        ValidationMsg validationMsg = aemContext.request().getResource().adaptTo(ValidationMsg.class);
        validationMsg.getConfirmPasswordRequiredMsg();
        validationMsg.getConfirmPasswordRestrictionMsg();
        validationMsg.getEmailInValidMsg();
        validationMsg.getEmailRequiredMsg();
        validationMsg.getMobileInValidMsg();
        validationMsg.getMobileRequiredMsg();
        validationMsg.getPasswordNotMatchErrorMessage();
        validationMsg.getPasswordRequiredMsg();
        validationMsg.getPasswordRestrictionMsg();
    }

    @Test
    final void getDynamicCartProps(){
        aemContext.currentResource(PROPERTIES_JSON_DYNAMIC_CART);
        DynamicCartExporter dynamicCartExporter = aemContext.request().adaptTo(DynamicCartExporter.class);
        dynamicCartExporter.getExportedType();
        dynamicCartExporter.getTitle();
        dynamicCartExporter.getViewPlanAccordianLabel();

    }

    @Test
    final void getRewardsTableProps(){
        aemContext.currentResource(PROPERTIES_JSON_REWARDS_TABLE);
        RewardsTableExporter rewardsTableExporter = aemContext.request().adaptTo(RewardsTableExporter.class);
        rewardsTableExporter.getColumnHeader1();
        rewardsTableExporter.getColumnHeader2();
        rewardsTableExporter.getExportedType();
        rewardsTableExporter.getTableItems();

    }

    @Test
    final void getRewardsTableLabelProps(){
        aemContext.currentResource(PROPERTIES_JSON_REWARDS_TABLE_LABEL);
        Labels labels = aemContext.request().getResource().adaptTo(Labels.class);
        labels.getLabel1();
        labels.getLabel2();
    }


    @Test
    final void getPostpaidPersonalProps(){
        aemContext.currentResource(PROPERTIES_JSON_POSTPAID_PERSONAL_DATA);
        PostpaidPersonalDetailsExporter postpaidPersonalDetailsExporter = aemContext.request().adaptTo(PostpaidPersonalDetailsExporter.class);
        postpaidPersonalDetailsExporter.getExportedType();
        postpaidPersonalDetailsExporter.getHeading();
        postpaidPersonalDetailsExporter.getPortingSectionHeading();
        postpaidPersonalDetailsExporter.getFrmFields();
        postpaidPersonalDetailsExporter.getValidationMessages();
    }

    @Test
    final void getPostpaidPersonalFormFieldProps(){
        aemContext.currentResource(PROPERTIES_JSON_POSTPAID_PERSONAL_DATA_FORM);
        PostpaidPersonalDetailsFormFields PostpaidPersonalDetailsFormFields = aemContext.request().getResource().adaptTo(PostpaidPersonalDetailsFormFields.class);
        PostpaidPersonalDetailsFormFields.getEmailPlaceholder();
        PostpaidPersonalDetailsFormFields.getfNameLabel();
        PostpaidPersonalDetailsFormFields.getFnamePlaceholder();
        PostpaidPersonalDetailsFormFields.getlNameLabel();
        PostpaidPersonalDetailsFormFields.getlNamePlaceholder();
        PostpaidPersonalDetailsFormFields.getDobLabel();
        PostpaidPersonalDetailsFormFields.getDayLabel();
        PostpaidPersonalDetailsFormFields.getDayPalceholder();
        PostpaidPersonalDetailsFormFields.getMonthLabel();
        PostpaidPersonalDetailsFormFields.getMonthPlaceholder();
        PostpaidPersonalDetailsFormFields.getYearLabel();
        PostpaidPersonalDetailsFormFields.getYearPlaceholder();
        PostpaidPersonalDetailsFormFields.getShippingLabel();
        PostpaidPersonalDetailsFormFields.getShippingPlaceholder();
        PostpaidPersonalDetailsFormFields.getCurrentProviderHelperText();
        PostpaidPersonalDetailsFormFields.getCurrentProviderLabel();
        PostpaidPersonalDetailsFormFields.getCurrentProviderPlaceholder();
        PostpaidPersonalDetailsFormFields.getCurrentProviderInfoDescription();
        PostpaidPersonalDetailsFormFields.getConsentDescription();
        PostpaidPersonalDetailsFormFields.getExitingPhoneHelperLabel();
        PostpaidPersonalDetailsFormFields.getOrTextLabel();
        PostpaidPersonalDetailsFormFields.getPortInNumberLabel();
        PostpaidPersonalDetailsFormFields.getPortInNumberPlaceHolder();
        PostpaidPersonalDetailsFormFields.getLinkCTALabel();
        PostpaidPersonalDetailsFormFields.getButtonCTALabel();
        PostpaidPersonalDetailsFormFields.getCurrentProviderInfoLinkLabel();
        PostpaidPersonalDetailsFormFields.getCurrentProviderInfoLinkURL();
        PostpaidPersonalDetailsFormFields.getCurrentProviderUsageAcceptanceLabel();
        PostpaidPersonalDetailsFormFields.getCurrentProviderAdvertisingAcceptanceLabel();
        PostpaidPersonalDetailsFormFields.getCtaContinueLabel();
        PostpaidPersonalDetailsFormFields.getConsentPreviewText();
        PostpaidPersonalDetailsFormFields.getShippingHelperText();
        PostpaidPersonalDetailsFormFields.getRadioNoThanks();
        PostpaidPersonalDetailsFormFields.getRadioPortIn();
        PostpaidPersonalDetailsFormFields.getRadioUseLebaraSim();
        PostpaidPersonalDetailsFormFields.getKeyInAddress();
        PostpaidPersonalDetailsFormFields.getStreetLabel();
        PostpaidPersonalDetailsFormFields.getAddressKeyInText();
        PostpaidPersonalDetailsFormFields.getPostalcodePlaceholder();
        PostpaidPersonalDetailsFormFields.getEnterAddressManually();
        PostpaidPersonalDetailsFormFields.getStreetPlaceholder();
        PostpaidPersonalDetailsFormFields.getHouseNumberLabel();
        PostpaidPersonalDetailsFormFields.getHouseNumberPlaceholder();
        PostpaidPersonalDetailsFormFields.getZipCodeLabel();
        PostpaidPersonalDetailsFormFields.getZipCodePlaceholder();
        PostpaidPersonalDetailsFormFields.getCityLabel();
        PostpaidPersonalDetailsFormFields.getCityPlaceholder();
        PostpaidPersonalDetailsFormFields.getSaveAddress();
        PostpaidPersonalDetailsFormFields.getCurrentProviderAdvertisingPreviewText();
        PostpaidPersonalDetailsFormFields.getMobileLabel();
        PostpaidPersonalDetailsFormFields.getMobilePlaceholder();
        PostpaidPersonalDetailsFormFields.getVerifyCodeLabel();
        PostpaidPersonalDetailsFormFields.getVerifyCodePlaceholder();
        PostpaidPersonalDetailsFormFields.getCtaResendVerificationLabel();
        PostpaidPersonalDetailsFormFields.getCtaEditMobileLabel();
        PostpaidPersonalDetailsFormFields.getCtaSkipLabel();

        //todo:add mocks for these to increase coverage to 60 percent
        PostpaidPersonalDetailsFormFields.getPortInOptionArray();
        PostpaidPersonalDetailsFormFields.getCurrentProvidersList();
    }

    @Test
    final void getPostpaidPersonalValidationProps(){
        aemContext.currentResource(PROPERTIES_JSON_POSTPAID_PERSONAL_DATA_VALIDATION);
        PostpaidPersonalDetailsErrorMsg postpaidPersonalDetailsErrorMsg = aemContext.request().getResource().adaptTo(PostpaidPersonalDetailsErrorMsg.class);
        postpaidPersonalDetailsErrorMsg.getfNameRequiredMsg();
        postpaidPersonalDetailsErrorMsg.getfNameInValidMsg();
        postpaidPersonalDetailsErrorMsg.getlNameRequiredMsg();
        postpaidPersonalDetailsErrorMsg.getlNameInValidMsg();
        postpaidPersonalDetailsErrorMsg.getEmailRequiredMsg();
        postpaidPersonalDetailsErrorMsg.getEmailInValidMsg();
        postpaidPersonalDetailsErrorMsg.getDayRequiredMsg();
        postpaidPersonalDetailsErrorMsg.getDayInValidMsg();
        postpaidPersonalDetailsErrorMsg.getMonthRequiredMsg();
        postpaidPersonalDetailsErrorMsg.getMonthInValidMsg();
        postpaidPersonalDetailsErrorMsg.getYearRequiredMsg();
        postpaidPersonalDetailsErrorMsg.getYearInValidMsg();
        postpaidPersonalDetailsErrorMsg.getYearInvalidAgeMsg();
        postpaidPersonalDetailsErrorMsg.getShippingRequiredMsg();
        postpaidPersonalDetailsErrorMsg.getPortInNumberRequiredMsg();
        postpaidPersonalDetailsErrorMsg.getPortInNumberInValidMsg();
        postpaidPersonalDetailsErrorMsg.getCurrentProviderRequiredMsg();
        postpaidPersonalDetailsErrorMsg.getMobileRequiredMsg();
        postpaidPersonalDetailsErrorMsg.getMobileInValidMsg();
        postpaidPersonalDetailsErrorMsg.getVerifyCodeInvalidMsg();
        postpaidPersonalDetailsErrorMsg.getVerifyCodeRequiredMsg();
    }
}
