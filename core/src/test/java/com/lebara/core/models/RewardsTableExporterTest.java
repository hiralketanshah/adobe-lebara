package com.lebara.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class RewardsTableExporterTest {
    private final AemContext aemContext = new AemContext();
    private static final String PROPERTIES_JSON = "/content/lebara/de/de/rewards-table/jcr:content/root/responsivegrid/rewardstable";

    @BeforeEach
    void setUp() {
        aemContext.addModelsForClasses(RewardsTableExporter.class);
        aemContext.load().json("/rewards-table.json", "/content/lebara/de/de/rewards-table");
    }

    @Test
    void getTableItemsTest() {
        aemContext.currentResource(PROPERTIES_JSON);
        RewardsTableExporter rewardsTableExporter = aemContext.request().adaptTo( RewardsTableExporter.class);
        rewardsTableExporter.getTableItems();
        rewardsTableExporter.getExportedType();
        rewardsTableExporter.getColumnHeader1();
        rewardsTableExporter.getColumnHeader2();
        rewardsTableExporter.getExportedType();
    }

}