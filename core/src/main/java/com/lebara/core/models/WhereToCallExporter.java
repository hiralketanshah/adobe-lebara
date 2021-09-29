package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.lebara.core.dto.CountryInfo;
import com.lebara.core.dto.SelectBean;
import com.lebara.core.utils.CFUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.List;

@Model(adaptables = {SlingHttpServletRequest.class, Resource.class}, adapters = {WhereToCallExporter.class, ComponentExporter.class},
        resourceType = WhereToCallExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class WhereToCallExporter implements ComponentExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/wheretocall";

    @SlingObject
    private ResourceResolver resourceResolver;

    @ValueMapValue
    private String cfPath;

    @ValueMapValue
    private String fileReference;

    @ValueMapValue
    private String title;

    public String getFileReference() {
        return fileReference;
    }

    public String getTitle() {
        return title;
    }

    public List<SelectBean> getCountries(){
        return CFUtils.populateCountryInfo(resourceResolver.getResource(cfPath));
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
