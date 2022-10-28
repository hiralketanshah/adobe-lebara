package com.lebara.core.models;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ AemContextExtension.class })
@TestInstance(value = Lifecycle.PER_CLASS)
public class AddressDetailsExporterTest {

    private final AemContext aemContext = new AemContext();
    AddressDetailsExporter addressDetailsExporter = new AddressDetailsExporter();

    @BeforeAll
    void setUpBeforeClass() {
        aemContext.load().json("/addressdetails-component.json", "/addressdetails");
        aemContext.currentResource("/addressdetails");
        addressDetailsExporter = aemContext.request().adaptTo(AddressDetailsExporter.class);
    }

    @Test
    public void testGetStreetInvalidCharErrorMessage() {
        assertEquals("Invalid street name. Please enter your street.",
                addressDetailsExporter.getStreetInvalidCharErrorMessage());
    }

    @Test
    public void testGetStreetCharLimitErrorMessage() {
        assertEquals("The street name can have a maximum of 56 alphanumeric characters.",
                addressDetailsExporter.getStreetCharLimitErrorMessage());
    }

    @Test
    public void testGetHouseNumberEmptyErrorMessage() {
        assertEquals("Please enter your house number. This field is mandatory.",
                addressDetailsExporter.getHouseNumberEmptyErrorMessage());
    }

    @Test
    public void testGetStreetLabel() {
        assertEquals("Street", addressDetailsExporter.getStreetLabel());
    }

    @Test
    public void testGetHouseNumberCharLimitErrorMessage() {
        assertEquals("Your house number can have a maximum of 25 characters. Please enter your house number.",
                addressDetailsExporter.getHouseNumberCharLimitErrorMessage());
    }

    @Test
    public void testGetPostcodeInvalidCharErrorMessage() {
        assertEquals("Invalid postcode", addressDetailsExporter.getPostcodeInvalidCharErrorMessage());
    }

    @Test
    public void testGetPostCodeLabel() {
        assertEquals("Postcode", addressDetailsExporter.getPostCodeLabel());
    }

    @Test
    public void testGetPostCodeEmptyErrorMessage() {
        assertEquals("Please enter your postcode. This field is mandatory.",
                addressDetailsExporter.getPostCodeEmptyErrorMessage());
    }

    @Test
    public void testGetCityCharLimitErrorMessage() {
        assertEquals("The city name can have a maximum of 20 characters. Please enter your city.",
                addressDetailsExporter.getCityCharLimitErrorMessage());
    }

    @Test
    public void testGetContinueButtonLabel() {
        assertEquals("Continue", addressDetailsExporter.getContinueButtonLabel());
    }

    @Test
    public void testGetSearchAddressLabel() {
        assertEquals("Search address", addressDetailsExporter.getSearchAddressLabel());
    }

    @Test
    public void testGetContinueCTALink() {
        assertEquals("/en/3300151/orderdetails.html", addressDetailsExporter.getContinueCTALink());
    }

    @Test
    public void testGetHouseNumberInvalidCharErrorMessage() {
        assertEquals("Invalid house number.", addressDetailsExporter.getHouseNumberInvalidCharErrorMessage());
    }

    @Test
    public void testGetCityEmptyErrorMessage() {
        assertEquals("Please enter your city. This field is mandatory.",
                addressDetailsExporter.getCityEmptyErrorMessage());
    }

    @Test
    public void testGetPostCodePlaceholder() {
        assertEquals("Enter your postcode", addressDetailsExporter.getPostCodePlaceholder());
    }

    @Test
    public void testGetEnterAddressManually() {
        assertEquals("Enter your address manually ?", addressDetailsExporter.getEnterAddressManually());
    }

    @Test
    public void testGetPostCodeMinCharErrorMessage() {
        assertEquals("Your postcode must have at least 5 characters. Please enter your postcode.",
                addressDetailsExporter.getPostCodeMinCharErrorMessage());
    }

    @Test
    public void testGetPostCodeMaxCharErrorMessage() {
        assertEquals("Your postcode can have a maximum of 10 characters. Please enter your postcode.",
                addressDetailsExporter.getPostCodeMaxCharErrorMessage());
    }

    @Test
    public void testGetAddressListModalHeading() {
        assertEquals("Search result", addressDetailsExporter.getAddressListModalHeading());
    }

    @Test
    public void testGetHouseNumberLabel() {
        assertEquals("House number", addressDetailsExporter.getHouseNumberLabel());
    }

    @Test
    public void testGetStreetPlaceholder() {
        assertEquals("Enter your street name", addressDetailsExporter.getStreetPlaceholder());
    }

    @Test
    public void testGetCityPlaceholder() {
        assertEquals("Enter your city", addressDetailsExporter.getCityPlaceholder());
    }

    @Test
    public void testGetStreetEmptyErrorMessage() {
        assertEquals("Please enter your street. This field is mandatory.",
                addressDetailsExporter.getStreetEmptyErrorMessage());
    }

    @Test
    public void testGetCityLabel() {
        assertEquals("City", addressDetailsExporter.getCityLabel());
    }

    @Test
    public void testGetKeyInAddress() {
        assertEquals("Key in your postal code and house number to find your address",
                addressDetailsExporter.getKeyInAddress());
    }

    @Test
    public void testGetHouseNumberPlaceholder() {
        assertEquals("Enter your House number", addressDetailsExporter.getHouseNumberPlaceholder());
    }

    @Test
    public void testGetAppliedStyles() {
        assertEquals("", addressDetailsExporter.getAppliedStyles());
    }

    @Test
    public void testGetExportedType() {
        assertEquals(AddressDetailsExporter.RESOURCE_TYPE, addressDetailsExporter.getExportedType());
    }

}