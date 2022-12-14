package com.lebara.core.models;

import com.adobe.cq.dam.cfm.ContentFragment;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;
import com.day.cq.i18n.I18n;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.lebara.core.models.beans.InternationalRatesItem;
import com.lebara.core.models.beans.SelectOption;
import com.lebara.core.utils.AemUtils;
import com.lebara.core.utils.CFUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import java.util.Collections;
import java.util.List;
import java.util.LinkedList;

@Model(adaptables = SlingHttpServletRequest.class, adapters = { InternationalRatesExporter.class,
		ComponentExporter.class }, resourceType = InternationalRatesExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class InternationalRatesExporter implements ComponentExporter {

	/**
	 * The resource type.
	 */
	protected static final String RESOURCE_TYPE = "lebara/components/internationalrates";

	final static Logger LOGGER = LoggerFactory.getLogger(CFUtils.class);

	@SlingObject
	private ResourceResolver resourceResolver;

	@ScriptVariable
	private Resource resource;

	@SlingObject
	private SlingHttpServletRequest slingRequest;

	@ValueMapValue
	private String cfPath;

	@ValueMapValue
	private String description;

	private String countryLabel;

	private String fragmentRootPath;

	private I18n i18n;

	private String[] contracts;
	private List<SelectOption> countryList;

	List<InternationalRatesItem> listOfRates;

	@PostConstruct
	public void init() {
		if (StringUtils.isNotBlank(cfPath)) {
			i18n = AemUtils.geti18n(resourceResolver, resource, slingRequest);
			PageManager pageManager = resourceResolver.adaptTo(PageManager.class);
			Page page = null;
			if (pageManager != null) {
				page = pageManager.getContainingPage(resource);
			}
			if (page != null) {
				InheritanceValueMap inheritedProp = new HierarchyNodeInheritanceValueMap(page.getContentResource());
				fragmentRootPath = inheritedProp.getInherited("internationalRatesRootPath", String.class);
			}
			Resource cfResource = resourceResolver.getResource(cfPath);
			if (cfResource != null) {
				ContentFragment irFragment = cfResource.adaptTo(ContentFragment.class);
				if (null != irFragment) {
					countryLabel = CFUtils.getElementValue(irFragment, "countryName");
					contracts = CFUtils.getElementArrayValue(irFragment, "contracts");
				}
			}
			LOGGER.debug("Interntional rates fragmentRootPath is {}", fragmentRootPath);
			if (StringUtils.isNotBlank(fragmentRootPath)) {
				countryList = CFUtils.getInternationalRates(resourceResolver, fragmentRootPath);
			} else {
				countryList = Collections.emptyList();
			}
			listOfRates = getInternationRates();
		}
	}

	private List<InternationalRatesItem> getInternationRates() {
		Gson gson = new Gson();
		List<InternationalRatesItem> listOfRates = new LinkedList<>();
		for (String contract : contracts) {
			InternationalRatesItem item = gson.fromJson(contract, InternationalRatesItem.class);
			listOfRates.add(item);
		}
		return listOfRates;
	}

	public List<InternationalRatesItem> getContracts() {
		return listOfRates;
	}

	public String getSelectCountryLabel() {
		return (i18n == null ? "Please select a country" : i18n.get("lebara.SelectCountry.label"));
	}

	public String getCountryLabel() {
		return countryLabel;
	}

	public String getDescription() {
		return description;
	}

	public List<SelectOption> getCountryList() {
		return countryList == null ? (Collections.emptyList()) : (Collections.unmodifiableList(countryList));
	}

	public String getLandlineLabel() {
		return i18n == null ? "Landline" : i18n.get("landline");
	}

	public String getMobileLabel() {
		return i18n == null ? "Mobile" : i18n.get("mobile");
	}

	public String getSmsLabel() {
		return i18n == null ? "SMS" : i18n.get("sms");
	}

	@Override
	public String getExportedType() {
		return RESOURCE_TYPE;
	}
}
