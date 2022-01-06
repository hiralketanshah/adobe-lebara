package com.lebara.core.models;

import javax.inject.Inject;

import com.lebara.core.utils.AemUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Text;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.via.ResourceSuperType;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

@Model(adaptables = SlingHttpServletRequest.class, adapters = { Text.class, ComponentExporter.class }, resourceType = {
    TextModel.RESOURCE_TYPE})
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class TextModel implements Text {

    protected static final String RESOURCE_TYPE = "lebara/components/text";

    @Self
    @Via(type = ResourceSuperType.class)
    private Text delegate;

    @Inject
    private Resource resource;

    @SlingObject
    private SlingHttpServletRequest slingRequest;

    @Override
    public String getText() {
        return jsoup(delegate.getText());
    }

    @Override
    public boolean isRichText() {
        return delegate.isRichText();
    }

    @Override
    public String getExportedType() {
        return resource.getResourceType();
    }

    public String jsoup(String text) {
        if (StringUtils.isNotBlank(text)) {
            Document doc = Jsoup.parse(text);
            Elements val = doc.getElementsByTag("a");
            for (Element aTag : val) {
                String hrefURL = aTag.attr("href"); //.replace("/content/lebara","");
                String shortURL = AemUtils.getLinkWithExtension(hrefURL, slingRequest);
                text.replace(hrefURL, shortURL);
            }
        } else {
            return StringUtils.EMPTY;
        }
        return text;
    }
}
