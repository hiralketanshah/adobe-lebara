package com.lebara.core.servlet;

import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.NameConstants;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.wcm.api.PageManager;
import com.google.common.collect.ImmutableMap;
import com.google.common.net.MediaType;
import com.lebara.core.models.beans.PaymentMethods;
import com.lebara.core.services.GlobalOsgiService;
import com.lebara.core.utils.AemUtils;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
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
import java.util.*;
import java.util.stream.Collectors;

@Component(service = Servlet.class,
        property = {
                Constants.SERVICE_DESCRIPTION + "=Servlet to retrive global configurations",
                "sling.servlet.methods=" + HttpConstants.METHOD_GET,
                "sling.servlet.resourceTypes=" + NameConstants.NT_PAGE,
                "sling.servlet.selectors=" + "globalConfigs",
                "sling.servlet.extensions=" + "js"
        })
public class GlobalConfigs extends SlingSafeMethodsServlet {

    private static final long serialVersionUID = 1L;
    private static final String CURRENCY_NAME = "currencyName";
    private static final String JOURNEY_PAGES = "journeyPages";
    private static final String PRIVATE_PAGES = "privatePages";
    private static final String PAYMENT_MESSAGES = "paymentMessages";
    private static final String PLAN_NOT_ELIGIBLE_ERROR_MESSAGE = "planNotEligibleErrorMessage";
    private static final String PLAN_NOT_ELIGIBLE_ERROR_TITLE = "planNotEligibleErrorTitle";
    private static final String PLAN_NOT_ELIGIBLE_ERROR_BUTTON_TEXT = "planNotEligibleErrorButtonText";

    @Reference
    private transient GlobalOsgiService globalOsgiService;

    @Override
    protected void doGet(final SlingHttpServletRequest req,
                         final SlingHttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType(MediaType.JAVASCRIPT_UTF_8.toString());
        resp.getWriter().println("var lebaraGlobalConfigs =" + new com.google.gson.Gson().toJson(getGlobalData(req)) + ";");
    }

    protected Object getGlobalData(SlingHttpServletRequest request) {
        Resource res = request.getResource().getChild(JcrConstants.JCR_CONTENT);
        InheritanceValueMap inheritedProp = new HierarchyNodeInheritanceValueMap(res);
        PageManager pageManager = request.getResourceResolver().adaptTo(PageManager.class);
        Page page = null;
        if (pageManager != null) {
            page = pageManager.getContainingPage(request.getResource());
        }
        return (new ImmutableMap.Builder())
                .put("locale", page!=null?Optional.ofNullable(page.getLanguage(false).toLanguageTag()).orElse(""):"")
                .put("country", page!=null?Optional.ofNullable(page.getLanguage(false).getCountry()).orElse(""):"")
                .put("apiHostUri", Optional.ofNullable(globalOsgiService.getApiHostUri()).orElse(""))
                .put("gqlEndpoint", Optional.ofNullable(globalOsgiService.getGqlEndpoint()).orElse(""))
                .put("paymentClientKey", Optional.ofNullable(globalOsgiService.getPaymentClientKey()).orElse(""))
                .put("paymentAdeyenEnv", Optional.ofNullable(globalOsgiService.getPaymentAdeyenEnv()).orElse(""))
                .put("isCaptchaEnabled", Optional.ofNullable(globalOsgiService.getIsCaptchaEnabled()).orElse(false))
                .put(CURRENCY_NAME, Optional.ofNullable(inheritedProp.getInherited(CURRENCY_NAME, String.class)).orElse(""))
                .put(JOURNEY_PAGES, getJourneyPages(request, page))
                .put(PRIVATE_PAGES, getPrivatePages(request, inheritedProp.getInherited(PRIVATE_PAGES, String[].class)))
                .put(PLAN_NOT_ELIGIBLE_ERROR_MESSAGE, Optional.ofNullable(inheritedProp.getInherited(PLAN_NOT_ELIGIBLE_ERROR_MESSAGE, String.class)).orElse(""))
                .put(PLAN_NOT_ELIGIBLE_ERROR_TITLE, Optional.ofNullable(inheritedProp.getInherited(PLAN_NOT_ELIGIBLE_ERROR_TITLE, String.class)).orElse(""))
                .put(PLAN_NOT_ELIGIBLE_ERROR_BUTTON_TEXT, Optional.ofNullable(inheritedProp.getInherited(PLAN_NOT_ELIGIBLE_ERROR_BUTTON_TEXT, String.class)).orElse(""))
                .put(PAYMENT_MESSAGES,getPaymentMethods(page)).build();
    }

    private PaymentMethods getPaymentMethods(Page page) {
        Page homePage = getRootPage(page);
        if (homePage == null) {
            return new PaymentMethods();
        }
        Resource paymentRes = homePage.getContentResource(PAYMENT_MESSAGES);
        if (paymentRes == null) {
            return new PaymentMethods();
        }
        PaymentMethods paymentMethods = paymentRes.adaptTo(PaymentMethods.class);
        if (paymentMethods == null) {
            return new PaymentMethods();
        }
        return paymentMethods;
    }

    protected Object getJourneyPages(SlingHttpServletRequest request, Page currentPage) {
        if (currentPage != null) {
            Map<String, String> items = new HashMap<String, String>();
            while (currentPage.getContentResource(JOURNEY_PAGES) == null && !currentPage.getAbsoluteParent(1).getPath().equals(currentPage.getPath())) {
                currentPage = currentPage.getParent();
            }
            if (currentPage != null && currentPage.getContentResource(JOURNEY_PAGES) != null) {
                Iterator<Resource> children = currentPage.getContentResource(JOURNEY_PAGES).listChildren();
                while (children.hasNext()) {
                    Resource child = children.next();
                    if (StringUtils.equalsIgnoreCase(child.getValueMap().get("name", String.class), "home")) {
                        items.put("/", AemUtils.getLinkWithExtension(child.getValueMap().get("path", String.class), request));
                    } else {
                        items.put("/".concat(child.getValueMap().get("name", String.class)), AemUtils.getLinkWithExtension(child.getValueMap().get("path", String.class), request));
                    }
                }

            }
            return new com.google.gson.Gson().toJson(items);
        }
        return "{}";
    }

    protected List<String> getPrivatePages(SlingHttpServletRequest request, String[] privatePages) {
        if (ArrayUtils.isNotEmpty(privatePages)) {
            return Arrays.stream(privatePages).map(link  -> AemUtils.getLinkWithExtension(link, request)).collect(Collectors.toList());
        }
        return Collections.<String>emptyList();
    }

    /**
     * Recursive logic to return of root of current page which contains payment message child node in it.
     */
    public static Page getRootPage(Page currentPage) {
        if (currentPage == null) {
            return null;
        }
        while (currentPage.getContentResource(PAYMENT_MESSAGES) == null && !currentPage.getAbsoluteParent(1).getPath().equals(currentPage.getPath())) {
            currentPage = currentPage.getParent();
        }
        return currentPage;
    }
}

