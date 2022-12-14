package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.day.cq.wcm.api.designer.Style;
import com.lebara.core.utils.AemUtils;

import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Source;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = SlingHttpServletRequest.class, adapters = {GetItNowExporter.class,
        ComponentExporter.class}, resourceType = GetItNowExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class GetItNowExporter extends IntroExporter {
    protected static final String RESOURCE_TYPE = "lebara/components/getitnow";

    @SlingObject
    private SlingHttpServletRequest request;

    @ValueMapValue
    private String imagePath;
    
	@ValueMapValue
	private String imageUrl;
    
    @Inject @Source("script-bindings")
    private Style currentStyle;

    @ValueMapValue
    private String title;

    @ValueMapValue
    private String headingType;
    @ValueMapValue
    private String buttonCTALabel;
    @ValueMapValue
    private String buttonCTALink;
    @ValueMapValue
    private String getItNowErrorMessage;
    @ValueMapValue
    private String description;
    @ValueMapValue
    private boolean isSimChoiceFlow;
    @ValueMapValue
    private boolean showAttachSim;

    @Override
    public String getDescription() {
        return AemUtils.updateShortenLinksInRichText(description,request);
    }

    public String getImagePath() {
        return AemUtils.getImageRendition(imagePath, currentStyle.get("rendition", String.class), request.getResourceResolver());
    }
    
	public String getImageUrl() {
		return AemUtils.getLinkWithExtension(imageUrl, request);
	}

    public String getTitle() {
        return title;
    }

    public String getHeadingType() {
        return headingType;
    }

    public String getButtonCTALabel() {
        return buttonCTALabel;
    }

    public String getButtonCTALink() {
        return AemUtils.getLinkWithExtension(buttonCTALink, request);
    }

    public String getGetItNowErrorMessage() {
        return getItNowErrorMessage;
    }

    public boolean getIsSimChoiceFlow() {
        return isSimChoiceFlow;
    }
    
    public boolean getShowAttachSim() {
        return showAttachSim;
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
