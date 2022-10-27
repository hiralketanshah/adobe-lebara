package com.lebara.core.models;

import com.lebara.core.models.beans.SelectOption;
import com.lebara.core.utils.AemUtils;
import com.lebara.core.utils.AltLinkUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.*;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

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
        altLangLinks = AltLinkUtils.populateAlternateLinks(path, resourceResolver);
        currentDomain = AltLinkUtils.getCurrentDomain();
        defaultLink = AltLinkUtils.getDefaultLink();
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
