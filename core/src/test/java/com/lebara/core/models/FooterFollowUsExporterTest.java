package com.lebara.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
public class FooterFollowUsExporterTest {

    private final AemContext aemContext=new AemContext();
    private static final String PROPERTIES_JSON_FOLLOW_US = "/content/experience-fragments/lebara/de/de/site/footer/master/jcr:content/root/footer_1975276557/followus";

    @BeforeEach
    void setUp() {
        aemContext.addModelsForClasses(FaqExporter.class);
        aemContext.load().json("/follow-us.json","/content/experience-fragments/lebara/de/de/site/footer/master");
    }

    @Test
    final void getFollowUsProps(){
        aemContext.currentResource(PROPERTIES_JSON_FOLLOW_US);
        FollowUsExporter followUsExporter = aemContext.request().adaptTo(FollowUsExporter.class);
        followUsExporter.getLinks();
        followUsExporter.getExportedType();
        followUsExporter.getFollowUsText();
    }
}
