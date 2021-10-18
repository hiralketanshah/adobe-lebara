package com.lebara.core.servlet;

import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.google.common.collect.ImmutableMap;
import com.google.common.net.MediaType;
import com.lebara.core.services.GlobalOsgiService;
import com.lebara.core.utils.AemUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import javax.servlet.Servlet;
import javax.servlet.ServletException;
import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Optional;

@Component(service = Servlet.class,
        property = {
                Constants.SERVICE_DESCRIPTION + "=Servlet to retrive global configurations",
                "sling.servlet.methods=" + HttpConstants.METHOD_GET,
                "sling.servlet.resourceTypes=" + "cq:Page",
                "sling.servlet.selectors=" + "globalConfigs",
                "sling.servlet.extensions=" + "js"
        })
public class GlobalConfigs extends SlingSafeMethodsServlet {

    private static final long serialVersionUID = 1L;
    private static final String CURRENCY_SYMBOL = "currencySymbol";
    private static final String JOURNEY_PAGES = "journeyPages";
    @Reference
    private GlobalOsgiService globalOsgiService;

    @Override
    protected void doGet(final SlingHttpServletRequest req,
                         final SlingHttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType(MediaType.JAVASCRIPT_UTF_8.toString());
        resp.getWriter().println("var lebaraGlobalConfigs =" + new com.google.gson.Gson().toJson(getGlobalData(req)) + ";");
    }

    protected Object getGlobalData(SlingHttpServletRequest request) {
        Resource res = request.getResource().getChild("jcr:content");
        InheritanceValueMap inheritedProp = new HierarchyNodeInheritanceValueMap(res);
        return (new ImmutableMap.Builder())
                .put("apiHostUri", Optional.ofNullable(globalOsgiService.getApiHostUri()).orElse(""))
                .put("gqlEndpoint", Optional.ofNullable(globalOsgiService.getGqlEndpoint()).orElse(""))
                .put("paymentClientKey", Optional.ofNullable(globalOsgiService.getPaymentClientKey()).orElse(""))
                .put("paymentAdeyenEnv", Optional.ofNullable(globalOsgiService.getPaymentAdeyenEnv()).orElse(""))
                .put(CURRENCY_SYMBOL, Optional.ofNullable(inheritedProp.getInherited(CURRENCY_SYMBOL, String.class)).orElse(""))
                .put(JOURNEY_PAGES, getJourneyPages(request)).build();
    }

    protected Object getJourneyPages(SlingHttpServletRequest request) {
        PageManager pageManager = (PageManager) request.getResourceResolver().adaptTo(PageManager.class);
        if (pageManager != null) {
            Page currentPage = pageManager.getContainingPage(request.getResource());
            Map<String, String> items = new HashMap<String, String>();
            while (currentPage.getContentResource(JOURNEY_PAGES) == null && currentPage.getAbsoluteParent(1).getPath() != currentPage.getPath()) {
                currentPage = currentPage.getParent();
            }
            if (currentPage != null && currentPage.getContentResource(JOURNEY_PAGES) != null) {
                Iterator<Resource> children = currentPage.getContentResource(JOURNEY_PAGES).listChildren();
                while (children.hasNext()) {
                    Resource child = children.next();
                    items.put(child.getValueMap().get("name", String.class), AemUtils.getLinkWithExtension(child.getValueMap().get("path", String.class)));
                }

            }
            return new com.google.gson.Gson().toJson(items);
        }
        return "{}";
    }
}

