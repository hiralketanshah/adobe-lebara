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
import org.apache.sling.api.resource.ModifiableValueMap;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.apache.sling.servlets.annotations.SlingServletResourceTypes;
import org.osgi.framework.Constants;
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
import com.google.common.net.MediaType;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@Component(service = Servlet.class, property = {Constants.SERVICE_DESCRIPTION + "=Internation Rates Migration Servlet",
        "sling.servlet.methods=" + HttpConstants.METHOD_GET, "sling.servlet.paths=" + "/bin/internationratesmigration"})
public class InternationMigrationServlet extends SlingSafeMethodsServlet {


    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
    	String cfPath = request.getParameter("path");
    	ResourceResolver resolver = request.getResourceResolver();
    	Resource cfRes = resolver.getResource(cfPath);
    	Iterator<Resource> iterator= cfRes.listChildren();
    	while(iterator.hasNext()) {
    		Resource child = iterator.next();
    		Resource master = child.getChild("jcr:content/data/master");
    		if(null!=master) {
    			Map<String, String> listOfContracts = new LinkedHashMap<>();
    			StringBuilder builder = new StringBuilder();
    			ModifiableValueMap map = master.adaptTo(ModifiableValueMap.class);
    			String landlineCallRate = map.get("landlineCallRate", String.class);
    			String mobileCallRate = map.get("mobileCallRate", String.class);
    			String smsRate = map.get("smsRate", String.class);
    			listOfContracts.put("contractTitle", "Rates");
    			listOfContracts.put("landlineCallRate", landlineCallRate);
    			listOfContracts.put("mobileCallRate", mobileCallRate);
    			listOfContracts.put("smsRate", smsRate);
    			
    			Gson gson = new Gson(); 
    			String json = gson.toJson(listOfContracts);
    			String[] jsonArray = {json};
    			int size = listOfContracts.size();
    			listOfContracts.clear();
    			map.put("contracts", jsonArray);
    			resolver.commit();
    			response.getWriter().write(jsonArray.toString());
    			
    		}
    	}
    }
}