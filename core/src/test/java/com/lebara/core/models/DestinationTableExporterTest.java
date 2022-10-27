package com.lebara.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith({AemContextExtension.class})
class DestinationTableExporterTest {

    private final AemContext aemContext = new AemContext();
    private static final String DESTINATION_TABLE_JSON = "/content/lebara/de/de/destination-table/jcr:content/root/responsivegrid/destinationtable";

    @Mock
    private ResourceResolver resourceResolver;

    @Mock
    private Resource resource;

    @BeforeEach
    void setUp() {
        aemContext.addModelsForClasses(DestinationTableExporter.class); 
    }

    @Test
    void getDestinationDetails() {
        aemContext.load().json("/destination-table.json", "/content/lebara/de/de/destination-table");
        aemContext.currentResource(DESTINATION_TABLE_JSON);
        DestinationTableExporter destinationTable = aemContext.request().adaptTo(DestinationTableExporter.class);
        destinationTable.getTitle();
        destinationTable.getCountryList();
        destinationTable.getNext();
        destinationTable.getPrevious();
        destinationTable.getSearchText();
        destinationTable.getPaginationText();
    }
}