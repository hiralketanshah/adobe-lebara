package com.lebara.core.models;

import com.lebara.core.models.beans.Link;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
public class FooterExporterTest {

    private final AemContext aemContext=new AemContext();
    private static final String PROPERTIES_JSON_FOLLOW_US = "/content/experience-fragments/lebara/de/de/site/footer/master/jcr:content/root/footer_1975276557/followus";
    private static final String PROPERTIES_JSON_FOLLOW_US_LINK = "/content/experience-fragments/lebara/de/de/site/footer/master/jcr:content/root/footercopyright/links/item0";
    private static final String PROPERTIES_JSON_FOOTER = "/content/experience-fragments/lebara/de/de/site/footer/master/jcr:content/root/footer_1975276557";
    private static final String PROPERTIES_JSON_GETAPP = "/content/experience-fragments/lebara/de/de/site/footer/master/jcr:content/root/footer_1975276557/getapp";

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

    @Test
    final void getFollowUsLinkProps(){
        aemContext.currentResource(PROPERTIES_JSON_FOLLOW_US_LINK);
        Link link = aemContext.request().getResource().adaptTo(Link.class);
        link.getLink();
        link.getLabel();
        link.getIcon();
        link.getExtensionlessLink();
        link.setIcon("");
        link.setLabel("");
        link.setLink("");
    }

    @Test
    final void getFoooterProps(){
        aemContext.currentResource(PROPERTIES_JSON_FOOTER);
        FooterExporter footerExporter = aemContext.request().adaptTo(FooterExporter.class);
        footerExporter.getCopyrightLinks();
        footerExporter.getCopyrightText();
        footerExporter.getExportedType();
        footerExporter.getFooterUpperLinks();
        footerExporter.getGetapp();
        footerExporter.init();
    }

    @Test
    final void  getAppTest(){
        aemContext.currentResource(PROPERTIES_JSON_GETAPP);
        GetAppExporter getAppExporter = aemContext.request().adaptTo(GetAppExporter.class);
        getAppExporter.getAppTitle();
        getAppExporter.getBackgroundColor();
        getAppExporter.getBackgroundImageDesktop();
        getAppExporter.getBackgroundImageMobile();
        getAppExporter.getExportedType();
        getAppExporter.isShow();
        getAppExporter.getTextDescription();
        getAppExporter.getTextCol2();
        getAppExporter.getTextCol1();
        getAppExporter.getLinks();
        getAppExporter.getGetAppLabel();
    }

}
