package com.lebara.core.models;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.extension.ExtendWith;

import org.junit.jupiter.api.TestInstance.Lifecycle;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ AemContextExtension.class })
@TestInstance(value = Lifecycle.PER_CLASS)
class PostpaidBuyPersonalDetailsExporterTest {

	private final AemContext aemContext = new AemContext();
	PostpaidBuyPersonalDetailsExporter postpaidBuyPersonalDetailsExporter = new PostpaidBuyPersonalDetailsExporter();
	
	@BeforeAll
    void setUpBeforeClass() {
        aemContext.load().json("/postpaidbuypersonaldetails-component.json", "/postpaidbuypersonaldetails");
        aemContext.currentResource("/postpaidbuypersonaldetails");
        postpaidBuyPersonalDetailsExporter = aemContext.request().adaptTo(PostpaidBuyPersonalDetailsExporter.class);
    }
	
	@Test
	void testGetPortingSectionHeading() {
		assertEquals("Number Port-in" , postpaidBuyPersonalDetailsExporter.getPortingSectionHeading());
	}
	
	@Test
	void testGetFrmFields() {
		assertEquals("Title" , postpaidBuyPersonalDetailsExporter.getFrmFields().getTitleLabel());
		assertEquals("Select title" , postpaidBuyPersonalDetailsExporter.getFrmFields().getTitlePlaceholder());
		assertEquals("<p>Number transfer is requested easily after purchase</p>" , postpaidBuyPersonalDetailsExporter.getFrmFields().getYesPortInDescription());
		assertEquals("Month" , postpaidBuyPersonalDetailsExporter.getFrmFields().getMonthLabel());
		assertEquals("Enter Day" , postpaidBuyPersonalDetailsExporter.getFrmFields().getDayPalceholder());
		assertEquals("Enter your mobile number" , postpaidBuyPersonalDetailsExporter.getFrmFields().getPortInNumberPlaceHolder());
		assertEquals("Enter Month" , postpaidBuyPersonalDetailsExporter.getFrmFields().getMonthPlaceholder());
		assertEquals("Last Name", postpaidBuyPersonalDetailsExporter.getFrmFields().getlNameLabel());
		assertEquals("Year" , postpaidBuyPersonalDetailsExporter.getFrmFields().getYearLabel());
		assertEquals("Enter Year" , postpaidBuyPersonalDetailsExporter.getFrmFields().getYearPlaceholder());
		assertEquals("First Name" , postpaidBuyPersonalDetailsExporter.getFrmFields().getfNameLabel());
		assertEquals("Date of Birth" , postpaidBuyPersonalDetailsExporter.getFrmFields().getDobLabel());
		assertEquals("Enter Your First Name" , postpaidBuyPersonalDetailsExporter.getFrmFields().getFnamePlaceholder());
		assertEquals("Enter Your First Name" , postpaidBuyPersonalDetailsExporter.getFrmFields().getlNamePlaceholder());
		assertEquals("Continue" , postpaidBuyPersonalDetailsExporter.getFrmFields().getCtaContinueLabel());
		assertEquals("<p>You can activate and start using your subscription immediately </p>" , postpaidBuyPersonalDetailsExporter.getFrmFields().getNoPortInDescription());
		assertEquals("Email Address" , postpaidBuyPersonalDetailsExporter.getFrmFields().getEmailLabel());
		assertEquals("Number to ported to Sim only" , postpaidBuyPersonalDetailsExporter.getFrmFields().getPortInNumberLabel());
		assertEquals("Enter Your Email Address" , postpaidBuyPersonalDetailsExporter.getFrmFields().getEmailPlaceholder());
		assertEquals("Day" , postpaidBuyPersonalDetailsExporter.getFrmFields().getDayLabel());
		assertEquals("No, I want a new number" , postpaidBuyPersonalDetailsExporter.getFrmFields().getPortInOptionArray().get(0).getLabel());
		assertEquals( "No" , postpaidBuyPersonalDetailsExporter.getFrmFields().getPortInOptionArray().get(0).getValue());
		assertEquals("Mr." , postpaidBuyPersonalDetailsExporter.getFrmFields().getTitleOptionArray().get(0).getName());
		assertEquals( "Mr" , postpaidBuyPersonalDetailsExporter.getFrmFields().getTitleOptionArray().get(0).getValue());
		assertEquals("the mobile number attached with ****45@gmail.com" , postpaidBuyPersonalDetailsExporter.getFrmFields().getPortInNumberCanBeUseWithLoginWarnMsg());
		assertEquals("Company Name" , postpaidBuyPersonalDetailsExporter.getFrmFields().getCompanyNameLabel());
		assertEquals("Name of the company" , postpaidBuyPersonalDetailsExporter.getFrmFields().getCompanyNamePlaceholder());
		assertEquals("KVK number (optional)" , postpaidBuyPersonalDetailsExporter.getFrmFields().getKvkNumberLabel());
		assertEquals("12345678" , postpaidBuyPersonalDetailsExporter.getFrmFields().getKvkNumberPlaceholder());
		assertEquals("VAT-number (optional)" , postpaidBuyPersonalDetailsExporter.getFrmFields().getVatNumberLabel());
		assertEquals("NL00000000000B00" , postpaidBuyPersonalDetailsExporter.getFrmFields().getVatNumberPlaceholder());
	}
	
	@Test
	void testGetValidationMessages() {
		assertEquals("The title cannot be empty" , postpaidBuyPersonalDetailsExporter.getValidationMessages().getTitleRequiredMsg());
		assertEquals("Please Select Day" , postpaidBuyPersonalDetailsExporter.getValidationMessages().getDayRequiredMsg());
		assertEquals("Please Select Month" , postpaidBuyPersonalDetailsExporter.getValidationMessages().getMonthRequiredMsg());
		assertEquals("Please Select Year" , postpaidBuyPersonalDetailsExporter.getValidationMessages().getYearRequiredMsg());
		assertEquals("Please Enter Port In Number" , postpaidBuyPersonalDetailsExporter.getValidationMessages().getPortInNumberRequiredMsg());
		assertEquals("Please enter a valid First Name , First name cannot be empty" , postpaidBuyPersonalDetailsExporter.getValidationMessages().getfNameRequiredMsg());
		assertEquals("Please enter a valid email address. For example username@domain.com" , postpaidBuyPersonalDetailsExporter.getValidationMessages().getEmailInValidMsg());
		assertEquals("Please Enter Valid Port In Number" , postpaidBuyPersonalDetailsExporter.getValidationMessages().getPortInNumberInValidMsg());
		assertEquals("The First name cannot contain any special characters ($, @, #, !, %. * ^() ?)" , postpaidBuyPersonalDetailsExporter.getValidationMessages().getfNameInValidMsg());
		assertEquals("Please Select Year" , postpaidBuyPersonalDetailsExporter.getValidationMessages().getYearInValidMsg());
		assertEquals("The Last name cannot contain any special characters ($, @, #, !, %. * ^() ?)" , postpaidBuyPersonalDetailsExporter.getValidationMessages().getlNameInValidMsg());
		assertEquals("Please enter a valid Last Name , Last name cannot be empty" , postpaidBuyPersonalDetailsExporter.getValidationMessages().getlNameRequiredMsg());
		assertEquals("The email address field cannot be empty" , postpaidBuyPersonalDetailsExporter.getValidationMessages().getEmailRequiredMsg());
		assertEquals("Please enter company name" , postpaidBuyPersonalDetailsExporter.getValidationMessages().getCompanyNameErrorRequired());
		assertEquals("Company name length should be from 2 to 250 characters" , postpaidBuyPersonalDetailsExporter.getValidationMessages().getCompanyNameErrorMinMax());
		assertEquals("Please enter valid company name" , postpaidBuyPersonalDetailsExporter.getValidationMessages().getCompanyNameErrorPattern());
		assertEquals("Chamber of Commerce number length should be less than 50 digits" , postpaidBuyPersonalDetailsExporter.getValidationMessages().getKvkNumberErrorMax());
		assertEquals("Please enter valid chamber of commerce number" , postpaidBuyPersonalDetailsExporter.getValidationMessages().getKvkNumberErrorPattern());
		assertEquals("Please enter valid vat-number" , postpaidBuyPersonalDetailsExporter.getValidationMessages().getVatNumberErrorPattern());
		assertEquals("Vat-number length should be less than 50 characters" , postpaidBuyPersonalDetailsExporter.getValidationMessages().getVatNumberErrorMax());
	}
	
	@Test
	void testIsShowTitle() {
		assertEquals(true , postpaidBuyPersonalDetailsExporter.isShowTitle());
	}
	
	@Test
	void testIsHideOrderSummary() {
		assertEquals(true , postpaidBuyPersonalDetailsExporter.isHideOrderSummary());
	}
	
	@Test
	void testIsHideConsentTrustworthy() {
		assertEquals(true , postpaidBuyPersonalDetailsExporter.isHideConsentTrustworthy());
	}
	
	@Test
	void testIsHideAddressSection() {
		assertEquals(true , postpaidBuyPersonalDetailsExporter.isHideAddressSection());
	}
	
	@Test
	void testIsNumberInSimOnly() {
		assertEquals(true , postpaidBuyPersonalDetailsExporter.isNumberInSimOnly());
	}
	
	@Test
	void testIsHideInternalHeading() {
		assertEquals(true , postpaidBuyPersonalDetailsExporter.isHideInternalHeading());
	}
	
	@Test
	void testIsFormPaddingsForCardMode() {
		assertEquals(true , postpaidBuyPersonalDetailsExporter.isFormPaddingsForCardMode());
	}
	
	@Test
	void testIsBigHeading() {
		assertEquals(true , postpaidBuyPersonalDetailsExporter.isBigHeading());
	}
	
	@Test
	void testIsDobSelectsMode() {
		assertEquals(true , postpaidBuyPersonalDetailsExporter.isDobSelectsMode());
	}
	
	@Test
	void testIsCustomFormFieldOrder() {
		assertEquals(true , postpaidBuyPersonalDetailsExporter.isCustomFormFieldOrder());
	}
	
	@Test
	void testIsAlreadyEmailNavigateToAddress() {
		assertEquals(true , postpaidBuyPersonalDetailsExporter.isAlreadyEmailNavigateToAddress());
	}
	
	@Test
    void testGetAppliedStyles() {
        assertEquals("", postpaidBuyPersonalDetailsExporter.getAppliedStyles());
    }
	
	@Test
    void testGetExportedType() {
        assertEquals(PostpaidBuyPersonalDetailsExporter.RESOURCE_TYPE, postpaidBuyPersonalDetailsExporter.getExportedType());
    }
}
