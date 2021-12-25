package com.lebara.core.utils;

import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;


@ExtendWith({AemContextExtension.class, MockitoExtension.class})
public class CFUtilsTest {

    @Test
    void getCountryCodeFromPayloadPathTest() {
        assertEquals("DE",CFUtils.getCountryCodeFromPayloadPath("/content/dam/lebara/markets/de/de/assets"));
        assertEquals("DK",CFUtils.getCountryCodeFromPayloadPath("/content/dam/lebara/markets/dk/de/assets"));
        assertEquals("GB",CFUtils.getCountryCodeFromPayloadPath("/content/dam/lebara/markets/uk/de/assets"));
        assertEquals("FR",CFUtils.getCountryCodeFromPayloadPath("/content/dam/lebara/markets/fr/de/assets"));
        assertEquals("NL",CFUtils.getCountryCodeFromPayloadPath("/content/dam/lebara/markets/nl/de/assets"));
        assertEquals("",CFUtils.getCountryCodeFromPayloadPath("/content/dam/lebara/markets/"));
    }
}
