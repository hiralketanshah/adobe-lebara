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
    private String DOMAIN_NAME = "https://www.lebara.de";
    List<SelectOption> altLangLinks = new ArrayList<>();

    @PostConstruct
    private void init() {
        Resource currentResource = request.getResource();
        if (currentResource == null) {
            return;
        }
        resourceResolver = currentResource.getResourceResolver();
        path = currentResource.getPath().replace("/jcr:content", "");
        Map<String, String> countryMap = new HashMap<>();
        countryMap.put("/de/de", "de-de");
        countryMap.put("/de/pl", "pl-de");
        countryMap.put("/de/ro", "ro-de");
        countryMap.put("/de/en", "en-de");
        //first for loop acts as a switch case as path in the if condition will have only either of the locales.
        for (Map.Entry<String, String> entry : countryMap.entrySet()) {
            if (path.contains("/de/de")) {
                defaultLink = DOMAIN_NAME + AemUtils.getLinkWithExtension(path, request);
            }
            if (path.contains(entry.getKey())) {
                String currentLocale = entry.getKey();
                SelectOption option = new SelectOption();
                option.setValue(DOMAIN_NAME + AemUtils.getLinkWithExtension(path, request));
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
                    if (otherLocalePath.contains("/de/de")) {
                        defaultLink = DOMAIN_NAME + AemUtils.getLinkWithExtension(otherLocalePath, request);
                    }
                    option = new SelectOption();
                    option.setValue(DOMAIN_NAME + AemUtils.getLinkWithExtension(otherLocalePath, request));
                    option.setLabel(nestedEntry.getValue());
                    altLangLinks.add(option);
                }
            }

        }
    }

    public String getCanonicalLink() {
        return DOMAIN_NAME + AemUtils.getLinkWithExtension(path, request);
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
