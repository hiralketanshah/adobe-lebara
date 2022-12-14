package com.lebara.core.models;

import com.adobe.cq.wcm.core.components.models.NavigationItem;
import com.day.cq.wcm.api.Page;
import com.drew.lang.annotations.NotNull;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.lebara.core.utils.AemUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * Custom Navigation Item
 * Add Custom Properties to NavigationItem Properties
 */
public class CustomNavigationItem implements NavigationItem {

    // Constants
    public static final String PROP_PAGE_ICON = "pageIcon";
    public static final String PROP_SHOW_NEW_TEXT = "showNewText";
    public static final String PROP_SIM_IMAGE_FILE = "simImageFile";
    public static final String PROP_IMAGE_TEXT = "imageText";
    public static final String PROP_IMAGE_PATH = "imagePath";

    private Resource resource;
    private Page page;
    private ValueMap properties;
    private NavigationItem item;
    private SlingHttpServletRequest request;

    /** Constructor
     * @param resource
     * @param item
     */
    public CustomNavigationItem(@NotNull Resource resource, @NotNull NavigationItem item, @NotNull SlingHttpServletRequest request) {
        this.resource = resource;
        this.item = item;
        this.page = Objects.requireNonNull(Objects.requireNonNull(resource.getResourceResolver().getResource(item.getPath())).adaptTo(Page.class));
        this.properties = page.getContentResource().getValueMap();
        this.request = request;
    }

    /** Default Property getters **/

    public String getId() {
        return item.getId();
    }
    public String getPath() {
        return AemUtils.getLinkWithExtension(item.getPath(), request);
    }

    @JsonProperty("children")
    public List<CustomNavigationItem> getNavChildren() {
        return item.getChildren().stream().map(p-> new CustomNavigationItem(resource, p, request)).collect(Collectors.toList());
    }

    public int getLevel() {
        return item.getLevel();
    }

    public boolean isActive() {
        return item.isActive();
    }

    public String getUrl() {
        return AemUtils.getLinkWithExtension(item.getURL(), request);
    }

    public String getTitle() {
        return item.getTitle();
    }

    @JsonProperty(":type")
    public String getType() {
        return item.getExportedType();
    }

    /** Custom Property getters **/

    public String getPageIcon() {
        return properties.get(PROP_PAGE_ICON, String.class);
    }

    public boolean isShowNewText() {
        return Boolean.parseBoolean(properties.get(PROP_SHOW_NEW_TEXT, String.class));
    }

    public String getSimImage() {
        return properties.get(PROP_SIM_IMAGE_FILE, String.class);
    }

    public String getImageText() {
        return properties.get(PROP_IMAGE_TEXT, String.class);
    }

    public String getImagePath() {
        return properties.get(PROP_IMAGE_PATH, String.class);
    }
}
