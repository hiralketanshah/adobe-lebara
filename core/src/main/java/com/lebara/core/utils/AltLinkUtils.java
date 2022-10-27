package com.lebara.core.utils;

import com.lebara.core.models.beans.SelectOption;
import org.apache.commons.lang.StringUtils;
import org.apache.sling.api.resource.ResourceResolver;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class AltLinkUtils {
    private AltLinkUtils() {
    }

    private static String defaultLink;
    private static String currentDomain = "";
    private static List<SelectOption>  altLangLinks;

    public static List<SelectOption> populateAlternateLinks(String path, ResourceResolver resourceResolver) {
        altLangLinks = new ArrayList<>();
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
        frCountryMap.put("/fr/en", "en-fr");

        String nl_default = "/nl/nl";
        Map<String, String> nlCountryMap = new HashMap<>();
        nlCountryMap.put("/nl/nl", "nl-nl");
        nlCountryMap.put("/nl/pl", "pl-nl");
        nlCountryMap.put("/nl/en", "en-nl");

        String dk_default = "/dk/da";
        Map<String, String> dkCountryMap = new HashMap<>();
        dkCountryMap.put("/dk/da", "da-dk");
        dkCountryMap.put("/dk/en", "en-dk");

        if (StringUtils.equalsIgnoreCase(country, "de")) {
            currentDomain = AemUtils.DE_DOMAIN_NAME;
            setAltLinks(de_default, AemUtils.DE_DOMAIN_NAME, deCountryMap, resourceResolver, path);
        }
        if (StringUtils.equalsIgnoreCase(country, "fr")) {
            currentDomain = AemUtils.FR_DOMAIN_NAME;
            setAltLinks(fr_default, AemUtils.FR_DOMAIN_NAME, frCountryMap, resourceResolver, path);
        }
        if (StringUtils.equalsIgnoreCase(country, "nl")) {
            currentDomain = AemUtils.NL_DOMAIN_NAME;
            setAltLinks(nl_default, AemUtils.NL_DOMAIN_NAME, nlCountryMap, resourceResolver, path);
        }
        if (StringUtils.equalsIgnoreCase(country, "dk")) {
            currentDomain = AemUtils.DK_DOMAIN_NAME;
            setAltLinks(dk_default, AemUtils.DK_DOMAIN_NAME, dkCountryMap, resourceResolver, path);
        }
        if (StringUtils.equalsIgnoreCase(country, "uk")) {
            currentDomain = AemUtils.UK_DOMAIN_NAME;
        }
        return altLangLinks;
    }

    private static void setAltLinks(String dafaultStr, String domainName, Map<String, String> countryMap, ResourceResolver resourceResolver, String path) {
        //first for loop acts as a switch case as path in the if condition will have only either of the locales.
        for (Map.Entry<String, String> entry : countryMap.entrySet()) {
            if (path.contains(dafaultStr)) {
                defaultLink = domainName + AemUtils.getLinkWithExtension(path);
            }
            if (path.contains(entry.getKey())) {
                String currentLocale = entry.getKey();
                SelectOption option = new SelectOption();
                option.setValue(domainName + AemUtils.getLinkWithExtension(path));
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
                        defaultLink = domainName + AemUtils.getLinkWithExtension(otherLocalePath);
                    }
                    option = new SelectOption();
                    option.setValue(domainName + AemUtils.getLinkWithExtension(otherLocalePath));
                    option.setLabel(nestedEntry.getValue());
                    altLangLinks.add(option);
                }
            }

        }
    }

    public static String getDefaultLink() {
        return defaultLink;
    }

    public static String getCurrentDomain() {
        return currentDomain;
    }
}
