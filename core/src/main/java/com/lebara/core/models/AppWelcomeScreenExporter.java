package com.lebara.core.models;

import java.util.Collections;
import java.util.List;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.lebara.core.models.beans.AppWelcomeScreen;

@Model(adaptables = {SlingHttpServletRequest.class, Resource.class}, adapters = {AppWelcomeScreenExporter.class, ComponentExporter.class},
        resourceType = AppWelcomeScreenExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class AppWelcomeScreenExporter implements ComponentExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/app/welcomescreen";

    @ValueMapValue
    private String nextLabel;
    
    @ValueMapValue
    private String previousLabel;
    
    @ValueMapValue
    private String copyrightText;
    
    @ValueMapValue
    private String welcomeScreenIcon;
    
    @ValueMapValue
    private String welcomeScreenTitle;
    
    @ValueMapValue
    private String welcomeScreenDescription;
    
    @ValueMapValue
    private String buttonCTALabelYes;
    
    @ValueMapValue
    private String buttonCTALabelNo;
    
    @ValueMapValue
    private String introductionScreensCtaButtonLabel;
    
    @ChildResource
    private List<AppWelcomeScreen> introductionScreens;

    public List<AppWelcomeScreen> getIntroductionScreens() {
        return introductionScreens == null ? Collections.emptyList() : Collections.unmodifiableList(introductionScreens);
    }
    
    public String getNextLabel() {
        return nextLabel;
    }

    public String getPreviousLabel() {
        return previousLabel;
    }

    public String getCopyrightText() {
        return copyrightText;
    }

    public String getWelcomeScreenIcon() {
        return welcomeScreenIcon;
    }

    public String getWelcomeScreenTitle() {
        return welcomeScreenTitle;
    }

    public String getWelcomeScreenDescription() {
        return welcomeScreenDescription;
    }

    public String getButtonCTALabelYes() {
        return buttonCTALabelYes;
    }

    public String getButtonCTALabelNo() {
        return buttonCTALabelNo;
    }
    
    public String getIntroductionScreensCtaButtonLabel() {
        return introductionScreensCtaButtonLabel;
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
