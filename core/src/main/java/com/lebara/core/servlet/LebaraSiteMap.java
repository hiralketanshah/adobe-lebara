package com.lebara.core.servlet;

import com.day.cq.wcm.api.NameConstants;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageFilter;
import com.day.cq.wcm.api.PageManager;
import com.google.common.net.MediaType;
import com.lebara.core.models.beans.SelectOption;
import com.lebara.core.utils.AemUtils;
import com.lebara.core.utils.AltLinkUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;

import javax.servlet.Servlet;
import javax.servlet.ServletException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Component(service = Servlet.class,
        property = {
                Constants.SERVICE_DESCRIPTION + "=Servlet to return custom Lebara Sitemap",
                "sling.servlet.methods=" + HttpConstants.METHOD_GET,
                "sling.servlet.resourceTypes=" + NameConstants.NT_PAGE,
                "sling.servlet.selectors=" + "lebarasitemap",
                "sling.servlet.extensions=" + "xml"
        })
public class LebaraSiteMap extends SlingSafeMethodsServlet {

    ResourceResolver resourceResolver;

    @Override
    protected void doGet(final SlingHttpServletRequest req,
                         final SlingHttpServletResponse resp) throws ServletException, IOException {
        resourceResolver = req.getResourceResolver();
        PageManager pageManager = resourceResolver.adaptTo(PageManager.class);
        List<String> pageList = new ArrayList<>();
        String currentDomain = "";
        if (pageManager == null) {
            return;
        }
        Page page = pageManager.getContainingPage(req.getResource());
        if (page == null) {
            return;
        }
        String rootPath = page.getPath();
        String country = AemUtils.getCountrySpecificCode(rootPath);
        if (StringUtils.equalsIgnoreCase(country, "de")) {
            currentDomain = AemUtils.DE_DOMAIN_NAME;
        }
        if (StringUtils.equalsIgnoreCase(country, "fr")) {
            currentDomain = AemUtils.FR_DOMAIN_NAME;
        }
        if (StringUtils.equalsIgnoreCase(country, "nl")) {
            currentDomain = AemUtils.NL_DOMAIN_NAME;
        }
        if (StringUtils.equalsIgnoreCase(country, "dk")) {
            currentDomain = AemUtils.DK_DOMAIN_NAME;
        }
        if (StringUtils.equalsIgnoreCase(country, "uk")) {
            currentDomain = AemUtils.UK_DOMAIN_NAME;
        }

        Iterator<Page> rootPageIterator = page.listChildren(new PageFilter(), true);
        while (rootPageIterator.hasNext()) {
            Page childPage = rootPageIterator.next();
            String path = childPage.getPath();
            pageList.add(path);

        }

        StringBuilder innerContent = new StringBuilder("");
        for (String pagePath : pageList) {
            innerContent.append("<url><loc>" + currentDomain + pagePath + ".html" + "</loc>" + getAlt(pagePath) + "</url>");
        }
        resp.setContentType(MediaType.XML_UTF_8.toString());
        resp.getWriter().println("<?xml version=\"1.0\" encoding=\"UTF-8\"?><urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\" xmlns:xhtml=\"http://www.w3.org/1999/xhtml\" xmlns:video=\"http://www.google.com/schemas/sitemap-video/1.1\" xmlns:image=\"http://www.google.com/schemas/sitemap-image/1.1\" xmlns:news=\"http://www.google.com/schemas/sitemap-news/0.9\">" + innerContent + "</urlset>");
    }

    private String getAlt(String pagePath) {
        List<SelectOption> altLangLinks = AltLinkUtils.populateAlternateLinks(pagePath, resourceResolver);
        StringBuilder altLinks = new StringBuilder("");
        for (SelectOption option : altLangLinks) {
            altLinks.append("<xhtml:link rel=\"alternate\" hreflang=\"" +
                    option.getLabel() +
                    "\" href=\"" +
                    option.getValue() +
                    "\" />");
        }
        return altLinks.toString();
    }


}

