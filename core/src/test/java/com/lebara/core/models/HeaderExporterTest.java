package com.lebara.core.models;

import com.lebara.core.models.impl.HeaderNavigationImpl;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
public class HeaderExporterTest {

    private final AemContext aemContext=new AemContext();
    private static final String PROPERTIES_JSON_HEADER_NAV = "/content/experience-fragments/lebara/de/de/site/header/master/jcr:content/root/headernavigation";
    private static final String PROPERTIES_JSON_LANGUAGE_NAV = "/content/experience-fragments/lebara/de/de/site/header/master/jcr:content/root/languagenavigation";

    @BeforeEach
    void setUp() {
        aemContext.addModelsForClasses(FaqExporter.class);
        aemContext.load().json("/header.json","/content/experience-fragments/lebara/de/de/site/header/master");
    }

    //@Test
    final void getHeaderProps(){
        aemContext.currentResource(PROPERTIES_JSON_HEADER_NAV);
        HeaderNavigation headerNavigationImpl = aemContext.request().adaptTo(HeaderNavigation.class);
        headerNavigationImpl.getAccountLink();
        headerNavigationImpl.getExportedType();
        headerNavigationImpl.getLinks();
        headerNavigationImpl.getLogoLinkURL();
        headerNavigationImpl.getLogoPath();
        headerNavigationImpl.getLogoutLabel();
        headerNavigationImpl.getNewText();
        headerNavigationImpl.getTopupCtaLink();
        headerNavigationImpl.getTopupCtaText();
    }

    @Test
    final void getHeaderLangProps() {
        aemContext.currentResource(PROPERTIES_JSON_LANGUAGE_NAV);
        LanguageHeaderNavigation languageHeaderNavigation = aemContext.request().adaptTo(LanguageHeaderNavigation.class);
        languageHeaderNavigation.getHelpLink();
        languageHeaderNavigation.getHelpTitle();
        languageHeaderNavigation.getStoreLink();
        languageHeaderNavigation.getStoreTitle();
        languageHeaderNavigation.getExportedType();
    }
}
