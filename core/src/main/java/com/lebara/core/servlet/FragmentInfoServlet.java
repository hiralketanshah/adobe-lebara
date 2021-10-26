package com.lebara.core.servlet;


import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;
import com.day.cq.i18n.I18n;
import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.google.gson.Gson;
import com.lebara.core.dto.OfferFragmentBean;
import com.lebara.core.utils.AemUtils;
import com.lebara.core.utils.CFUtils;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.apache.sling.servlets.annotations.SlingServletResourceTypes;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.servlet.Servlet;
import javax.servlet.ServletException;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Component(service = {Servlet.class})
@SlingServletResourceTypes(
        resourceTypes = "cq:Page",
        methods = "GET",
        extensions = "json",
        selectors = "offer")
public class FragmentInfoServlet extends SlingSafeMethodsServlet {
    private final Logger LOGGER = LoggerFactory.getLogger(getClass());

    @Reference
    private QueryBuilder queryBuilder;

    private I18n i18n;
    private String offerId;
    private String offerRootPath;

    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
        LOGGER.debug("request path {}", request.getPathInfo());
        if (request.getRequestParameter("offerId") == null) {
            return;
        }
        offerId = request.getRequestParameter("offerId").getString();
        if (StringUtils.isBlank(offerId)) {
            return;
        }
        ResourceResolver resourceResolver = request.getResourceResolver();
        PageManager pageManager = resourceResolver.adaptTo(PageManager.class);
        Page page = null;
        Resource resource = request.getResource();
        if (pageManager != null) {
            page = pageManager.getContainingPage(resource);
        }
        if (page != null) {
            InheritanceValueMap inheritedProp = new HierarchyNodeInheritanceValueMap(page.getContentResource());
            offerRootPath = inheritedProp.getInherited("offerRootPath", String.class);
        }
        if (StringUtils.isBlank(offerRootPath)) {
            LOGGER.info("please author the root path for fragments");
            return;
        }
        i18n = AemUtils.geti18n(resourceResolver, resource, request);
        Resource cfResource = resourceResolver.getResource(getOfferFragmentPath(resourceResolver));
        if (i18n == null || cfResource == null) {
            return;
        }
        OfferFragmentBean offerFragmentBean = CFUtils.populateOffers(cfResource, i18n);
        if (offerFragmentBean == null) {
            return;
        }
        Gson json = new Gson();
        response.getWriter().println(json.toJson(offerFragmentBean));
    }

    private String getOfferFragmentPath(ResourceResolver resourceResolver) {
        Query query = queryBuilder.createQuery(PredicateGroup.create(getPredicatesMap()), resourceResolver.adaptTo(Session.class));
        SearchResult searchResult = query.getResult();
        List<Hit> hitList = searchResult.getHits();
        String offerFragmentPath = StringUtils.EMPTY;
        if (CollectionUtils.isNotEmpty(hitList)) {
            LOGGER.debug("hit.getPath() {}", hitList.get(0));
            try {
                offerFragmentPath = hitList.get(0).getPath();
            } catch (RepositoryException e) {
                LOGGER.error("error while querying for fragments {}", e);
            }
        }
        return offerFragmentPath;
    }

    private Map<String, String> getPredicatesMap() {
        Map<String, String> predicate = new HashMap<>();
        predicate.put("path", offerRootPath);
        predicate.put("type", "dam:Asset");
        predicate.put("property", "jcr:content/data/master/offerid");
        predicate.put("property.value", offerId);
        return predicate;
    }
}