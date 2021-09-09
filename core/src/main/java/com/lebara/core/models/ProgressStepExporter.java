package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.drew.lang.annotations.NotNull;
import com.lebara.core.utils.AemUtils;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Model(adaptables = SlingHttpServletRequest.class, adapters = {ProgressStepExporter.class, ComponentExporter.class},
        resourceType = ProgressStepExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class ProgressStepExporter implements ComponentExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/progressstep";

    /** Logger **/
    public static final Logger LOG = LoggerFactory.getLogger(ProgressStepExporter.class);

    @ScriptVariable
    private Resource resource;

    @ScriptVariable
    private Page currentPage;

    @ScriptVariable
    private PageManager pageManager;

    @ChildResource
    private List<Link> progressStepLinks;

    private int activeStepIndex;
    private List<Link> pageLinks = new ArrayList<>();

    @PostConstruct
    public void init() {
        if (CollectionUtils.isEmpty(progressStepLinks) || pageManager == null) {
            LOG.debug("Progress Step Links Component is Empty");
            return;
        }
        for (int i = 0; i < progressStepLinks.size(); i++) {
            Page linkPage = pageManager.getContainingPage(progressStepLinks.get(i).getExtensionlessLink());
            Optional<Page> validPage = Optional.ofNullable(linkPage);
            Link pgLink = new Link();
            if (validPage.isPresent()) {
                LOG.debug("Valid Link Page URL is {} ", linkPage.getPath());
                pgLink.setLink(linkPage.getPath());
                pgLink.setLabel(Optional.ofNullable(progressStepLinks.get(i).getLabel()).orElseGet(() -> AemUtils.getTitle(linkPage)));
                if (isActive(linkPage)) {
                    activeStepIndex = i;
                }
                LOG.debug("Active Step Index {} ", activeStepIndex);
            } else {
                LOG.debug("Link Page URL is Invalid or empty : {}", progressStepLinks.get(i).getLink());
            }
            pageLinks.add(pgLink);
        }
    }

    private boolean isActive(@NotNull final Page page) {
        return this.currentPage.equals(page);
    }

    public List<Link> getPageLinks() {
        return pageLinks;
    }

    public int getActiveStepIndex() {
        return activeStepIndex;
    }

    @Override
    public String getExportedType() {
        return resource.getResourceType();
    }
}
