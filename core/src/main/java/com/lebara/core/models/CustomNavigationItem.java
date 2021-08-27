package com.lebara.core.models;

import com.adobe.cq.wcm.core.components.models.NavigationItem;
import com.day.cq.wcm.api.Page;
import com.drew.lang.annotations.NotNull;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * Custom Navigation Item
 * Add Custom Properties to NavigationItem Properties
 */
public class CustomNavigationItem {

    // Constants
    public static final String PROP_PAGE_ICON = "pageIcon";
    public static final String PROP_SHOW_NEW_TEXT = "showNewText";
    public static final String PROP_IMAGE_TEXT = "imageText";
    public static final String PROP_IMAGE_PATH = "imagePath";

    private Page page;
    private ValueMap properties;

    // Property Variables
    private String id;
    private String path;
    private List<CustomNavigationItem> children;
    private int level;
    private boolean active;
    private String url;
    private String title;
    private String type;

    /** Constructor
     * @param resource
     * @param item
     */
    public CustomNavigationItem(@NotNull Resource resource, @NotNull NavigationItem item) {
        this.id = item.getId();
        this.path = item.getPath();
        this.children = item.getChildren().stream().map(p-> new CustomNavigationItem(resource, p)).collect(Collectors.toList());
        this.level = item.getLevel();
        this.active = item.isActive();
        this.url = item.getURL();
        this.title = item.getTitle();
        this.type = item.getExportedType();
        this.page = Objects.requireNonNull(Objects.requireNonNull(resource.getResourceResolver().getResource(path)).adaptTo(Page.class));
        this.properties = page.getContentResource().getValueMap();
    }

    public String getId() {
        return id;
    }
    public String getPath() {
        return path;
    }

    public List<CustomNavigationItem> getChildren() {
        return children;
    }

    public int getLevel() {
        return level;
    }

    public boolean isActive() {
        return active;
    }

    public String getUrl() {
        return url;
    }

    public String getTitle() {
        return title;
    }

    @JsonProperty(":type")
    public String getType() {
        return type;
    }

    /** Custom Property getters **/

    public String getPageIcon() {
        return properties.get(PROP_PAGE_ICON, String.class);
    }

    public boolean isShowNewText() {
        return Boolean.parseBoolean(properties.get(PROP_SHOW_NEW_TEXT, String.class));
    }

    public String getImageText() {
        return properties.get(PROP_IMAGE_TEXT, String.class);
    }

    public String getImagePath() {
        return properties.get(PROP_IMAGE_PATH, String.class);
    }
}
