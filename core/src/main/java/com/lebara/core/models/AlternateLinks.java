package com.lebara.core.models;

import com.lebara.core.models.beans.SelectOption;
import com.lebara.core.utils.AemUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.*;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Model(adaptables = SlingHttpServletRequest.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class AlternateLinks {
    @Self
    private SlingHttpServletRequest request;

    private ResourceResolver resourceResolver;
    private String path;
    private String defaultLink;
    private String currentDomain = "";

    List<SelectOption> altLangLinks = new ArrayList<>();

    @PostConstruct
    private void init() {
        Resource currentResource = request.getResource();

        resourceResolver = currentResource.getResourceResolver();
        path = currentResource.getPath().replace("/jcr:content", "");
        String country = AemUtils.getCountrySpecificCode(path);

        String de_default = "/de/de";
        Map<String, String> deCountryMap = new HashMap<>();
        deCountryMap.put("/de/de", "de-de");
        deCountryMap.put("/de/pl", "pl-de");
        deCountryMap.put("/de/ro", "ro-de");
        deCountryMap.put("/de/en", "en-de");

        String fr_default = "/fr/fr";
        Map<String, String> frCountryMap = new HashMap<>();
        frCountryMap.put("/fr/fr", "fr-fr");
        frCountryMap.put("/fr/en", "fr-en");

        String nl_default = "/nl/nl";
        Map<String, String> nlCountryMap = new HashMap<>();
        frCountryMap.put("/nl/nl", "nl-nl");
        frCountryMap.put("/nl/pl", "nl-pl");
        frCountryMap.put("/nl/en", "nl-en");

        String dk_default = "/dk/da";
        Map<String, String> dkCountryMap = new HashMap<>();
        frCountryMap.put("/dk/da", "dk-da");
        frCountryMap.put("/dk/en", "dk-en");

        if (StringUtils.equalsIgnoreCase(country, "de")) {
            currentDomain = AemUtils.DE_DOMAIN_NAME;
            setAltLinks(de_default, AemUtils.DE_DOMAIN_NAME, deCountryMap);
        }
        if (StringUtils.equalsIgnoreCase(country, "fr")) {
            currentDomain = AemUtils.FR_DOMAIN_NAME;
            setAltLinks(fr_default, AemUtils.FR_DOMAIN_NAME, frCountryMap);
        }
        if (StringUtils.equalsIgnoreCase(country, "nl")) {
            currentDomain = AemUtils.NL_DOMAIN_NAME;
            setAltLinks(nl_default, AemUtils.NL_DOMAIN_NAME, nlCountryMap);
        }
        if (StringUtils.equalsIgnoreCase(country, "dk")) {
            currentDomain = AemUtils.DK_DOMAIN_NAME;
            setAltLinks(dk_default, AemUtils.DK_DOMAIN_NAME, dkCountryMap);
        }
        if (StringUtils.equalsIgnoreCase(country, "uk")) {
            currentDomain = AemUtils.UK_DOMAIN_NAME;
        }
    }

    private void setAltLinks(String dafaultStr, String domainName, Map<String, String> countryMap) {
        //first for loop acts as a switch case as path in the if condition will have only either of the locales.
        for (Map.Entry<String, String> entry : countryMap.entrySet()) {
            if (path.contains(dafaultStr)) {
                defaultLink = domainName + AemUtils.getLinkWithExtension(path, request);
            }
            if (path.contains(entry.getKey())) {
                String currentLocale = entry.getKey();
                SelectOption option = new SelectOption();
                option.setValue(domainName + AemUtils.getLinkWithExtension(path, request));
                option.setLabel(entry.getValue());
                altLangLinks.add(option);
                for (Map.Entry<String, String> nestedEntry : countryMap.entrySet()) {
                    if (StringUtils.equals(nestedEntry.getKey(), currentLocale)) {
                        continue;
                    }
                    String otherLocalePath = path.replace(currentLocale, nestedEntry.getKey());
                    if (resourceResolver.getResource(otherLocalePath) == null) {
                        continue;
                    }
                    if (otherLocalePath.contains(dafaultStr)) {
                        defaultLink = domainName + AemUtils.getLinkWithExtension(otherLocalePath, request);
                    }
                    option = new SelectOption();
                    option.setValue(domainName + AemUtils.getLinkWithExtension(otherLocalePath, request));
                    option.setLabel(nestedEntry.getValue());
                    altLangLinks.add(option);
                }
            }

        }
    }

    public String getCanonicalLink() {
        return currentDomain + AemUtils.getLinkWithExtension(path, request);
    }

    public String getDefaultLink() {
        return defaultLink;
    }

    /**
     * This method uses the current page and returns the list of alternate language pages by manipulating
     * the current page path to include other locales in the url
     */
    public List<SelectOption> getAlternateLanguageLinks() {
        return altLangLinks;
    }

}
