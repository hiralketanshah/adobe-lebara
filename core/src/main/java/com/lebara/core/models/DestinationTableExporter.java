package com.lebara.core.models;

import com.adobe.cq.dam.cfm.ContentFragment;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.day.cq.i18n.I18n;
import com.lebara.core.dto.CountryInfo;
import com.lebara.core.dto.OfferFragmentBean;
import com.lebara.core.dto.PlanInfo;
import com.lebara.core.utils.AemUtils;
import com.lebara.core.utils.CFUtils;

import org.apache.commons.logging.Log;
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
import java.util.ArrayList;
import java.util.List;

@Model(adaptables = SlingHttpServletRequest.class, adapters = { DestinationTableExporter.class,
        ComponentExporter.class }, resourceType = DestinationTableExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class DestinationTableExporter implements ComponentExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/destinationtable";

    private static final Logger LOGGER = LoggerFactory.getLogger(DestinationTableExporter.class);

    @SlingObject
    private SlingHttpServletRequest request;

    @SlingObject
    private ResourceResolver resourceResolver;

    @ScriptVariable
    private Resource resource;

    @SlingObject
    private SlingHttpServletRequest slingRequest;

    @ValueMapValue
    private String title;

    @ValueMapValue
    private String countryList;

    @ValueMapValue
    private String searchText;

    @ValueMapValue
    private String paginationText;

    @ValueMapValue
    private String previous;

    @ValueMapValue
    private String next;

    public String getTitle() {
        return title;
    }

    public List<CountryInfo> getCountryList() {
        List<CountryInfo> listOfCounties = new ArrayList<>();
        if (null != countryList) {
            Resource cfResource = resourceResolver.getResource(countryList);
            if (null != cfResource) {
                ContentFragment cfPlanFragment = cfResource.adaptTo(ContentFragment.class);
                //listOfCounties = CFUtils.getCountryList(cfResource, countryList);

            }
        }

        return listOfCounties;

    }

    public String getSearchText() {
        return searchText;
    }

    public String getPaginationText() {
        return paginationText;
    }

    public String getPrevious() {
        return previous;
    }

    public String getNext() {
        return next;
    }

    @Override
    public String getExportedType() {
        return resource.getResourceType();
    }
}
