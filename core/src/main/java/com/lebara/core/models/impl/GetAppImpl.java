package com.lebara.core.models.impl;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Image;
import com.adobe.cq.wcm.core.components.models.ImageArea;
import com.adobe.cq.wcm.core.components.models.datalayer.ComponentData;
import com.lebara.core.models.GetApp;
import com.lebara.core.models.Link;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.via.ResourceSuperType;

import java.util.List;

@Model(adaptables = SlingHttpServletRequest.class, adapters = {GetApp.class, ComponentExporter.class},
        resourceType = GetAppImpl.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class GetAppImpl implements GetApp {

    @ScriptVariable
    protected Resource resource;

    @ChildResource
    private List<Link> links;

    @ValueMapValue
    private String appTitle;

    @Self
    @Via(type = ResourceSuperType.class)
    private Image delegate;

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/getapp";


    @Override
    public String getId() {
        return delegate.getId();
    }

    @Override
    public ComponentData getData() {
        return delegate.getData();
    }

    @Override
    public String getExportedType() {
        return resource.getResourceType();
    }


    @Override
    public String getAppTitle() {
        return appTitle;
    }

    @Override
    public List<Link> getIcon() {
        return links;
    }

    @Override
    public String getSrc() {
        return delegate.getSrc();
    }

    @Override
    public String getAlt() {
        return delegate.getAlt();
    }

    @Override
    public String getTitle() {
        return delegate.getTitle();
    }

    @Override
    public String getUuid() {
        return delegate.getUuid();
    }

    @Override
    public String getLink() {
        return delegate.getLink();
    }

    @Override
    public boolean displayPopupTitle() {
        return delegate.displayPopupTitle();
    }

    @Override
    public String getFileReference() {
        return delegate.getFileReference();
    }

    @Override
    public int[] getWidths() {
        return delegate.getWidths();
    }

    @Override
    public String getSrcUriTemplate() {
        return delegate.getSrcUriTemplate();
    }

    @Override
    public boolean isLazyEnabled() {
        return delegate.isLazyEnabled();
    }

    @Override
    public int getLazyThreshold() {
        return delegate.getLazyThreshold();
    }

    @Override
    public List<ImageArea> getAreas() {
        return delegate.getAreas();
    }

    @Override
    public boolean isDecorative() {
        return delegate.isDecorative();
    }

    @Override
    public String getSmartCropRendition() {
        return delegate.getSmartCropRendition();
    }

    @Override
    public boolean isDmImage() {
        return delegate.isDmImage();
    }
}
