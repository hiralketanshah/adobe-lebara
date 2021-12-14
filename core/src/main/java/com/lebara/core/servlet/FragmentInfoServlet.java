package com.lebara.core.servlet;

import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;
import com.day.cq.i18n.I18n;
import com.day.cq.search.PredicateGroup;
import com.day.cq.dam.api.DamConstants;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import com.day.cq.wcm.api.NameConstants;
import org.slf4j.LoggerFactory;
import org.apache.sling.api.servlets.HttpConstants;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.servlet.Servlet;
import javax.servlet.ServletException;
import java.io.IOException;
import java.util.*;

@Component(service = {Servlet.class})
@SlingServletResourceTypes(
        resourceTypes = NameConstants.NT_PAGE,
        methods = HttpConstants.METHOD_GET,
        extensions = "json",
        selectors = "offer")
public class FragmentInfoServlet extends SlingSafeMethodsServlet {
    private transient Logger LOGGER = LoggerFactory.getLogger(getClass());

    @Reference
    private transient QueryBuilder queryBuilder;

    private transient I18n i18n;
    private String offerRootPath;

    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
        LOGGER.debug("request path {}", request.getPathInfo());
        if (request.getRequestParameter("offerId") == null) {
            return;
        }
        String offerId = request.getRequestParameter("offerId").getString();
        List<String> offerIdList = Arrays.asList(offerId.split(","));
        if (StringUtils.isBlank(offerId)) {
            return;
        }
        ResourceResolver resourceResolver = request.getResourceResolver();
        PageManager pageManager = resourceResolver.adaptTo(PageManager.class);
        Page page = null;
        Resource resource = request.getResource();
        List<OfferFragmentBean> offerFragmentBeanList = new ArrayList<>();
        if (pageManager != null) {
            page = pageManager.getContainingPage(resource);
        }
        if (page != null) {
            InheritanceValueMap inheritedProp = new HierarchyNodeInheritanceValueMap(page.getContentResource());
            offerRootPath = inheritedProp.getInherited("offerRootPath", String.class);
        }
        if (StringUtils.isBlank(offerRootPath)) {
            LOGGER.debug("please author the root path for fragments");
            return;
        }
        i18n = AemUtils.geti18n(resourceResolver, resource, request);
        getOfferFragmentPath(resourceResolver, offerIdList).stream().forEach(path -> {
                    Resource cfResource = resourceResolver.getResource(path);
                    if (i18n == null || cfResource == null) {
                        return;
                    }
                    OfferFragmentBean offerFragmentBean = CFUtils.populateOffers(cfResource, i18n);
                    if (offerFragmentBean == null) {
                        return;
                    }
                    offerFragmentBeanList.add(offerFragmentBean);
                }
                );
        ObjectMapper mapper = new ObjectMapper();
        String prettyPrintedJson = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(offerFragmentBeanList);
        response.getWriter().println(prettyPrintedJson);
    }

    private List<String> getOfferFragmentPath(ResourceResolver resourceResolver, List<String> offerIdList) {
        Query query = queryBuilder.createQuery(PredicateGroup.create(getPredicatesMap(offerIdList)), resourceResolver.adaptTo(Session.class));
        SearchResult searchResult = query.getResult();
        List<Hit> hitList = searchResult.getHits();
        List<String> offerFragmentsPath = new ArrayList<>();
        if (CollectionUtils.isNotEmpty(hitList)) {
                hitList.stream().forEach(hit -> {
                    try {
                        offerFragmentsPath.add(hitList.get(hitList.indexOf(hit)).getPath());
                    } catch (RepositoryException e) {
                        LOGGER.error("Error in results", e);
                    }
                });
        }
        return offerFragmentsPath;
    }

    private Map<String, String> getPredicatesMap(List<String> offerIdList) {
        Map<String, String> predicate = new HashMap<>();
        predicate.put("path", offerRootPath);
        predicate.put("type",  DamConstants.NT_DAM_ASSET);

        predicate.put("property", "jcr:content/data/master/offerid");
        offerIdList.forEach(id-> predicate.put("property.{0}_value".replace("{0}", String.valueOf(offerIdList.indexOf(id))), id));
        return predicate;
    }
}