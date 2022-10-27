package com.lebara.core.models.beans;

import com.fasterxml.jackson.annotation.JsonInclude;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Model(adapters = {HeaderPageBean.class}, adaptables = {SlingHttpServletRequest.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class HeaderPageBean {

    // Constants
    public static final String PROP_PAGE_ICON = "pageIcon";
    public static final String PROP_SHOW_NEW_TEXT = "showNewText";
    public static final String PROP_SIM_IMAGE_FILE = "simImageFile";
    public static final String PROP_IMAGE_TEXT = "imageText";
    public static final String PROP_IMAGE_PATH = "imagePath";

    private String url;
    private String pageIcon;
    private boolean showNewText;
    private String simImage;
    private String imageText;
    private String imagePath;
    private int level;
    private String title;
    private String path;
    private List<HeaderPageBean> children;


    public HeaderPageBean(ValueMap properties, String url, String pagetitle, int pagelevel, List<HeaderPageBean> pageChild) {
        if (properties != null) {
            this.pageIcon = properties.get(PROP_PAGE_ICON, String.class);
            this.showNewText = Boolean.parseBoolean(properties.get(PROP_SHOW_NEW_TEXT, String.class));
            this.simImage = properties.get(PROP_SIM_IMAGE_FILE, String.class);
            this.imageText = properties.get(PROP_IMAGE_TEXT, String.class);
            this.imagePath = properties.get(PROP_IMAGE_PATH, String.class);
        }
        this.url = url;
        this.path = url;
        this.level = pagelevel;
        this.title = pagetitle;
        this.children = pageChild;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public List<HeaderPageBean> getChildren() {
        return children;
    }

    public void setChildren(List<HeaderPageBean> children) {
        this.children = children;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public String getPageIcon() {
        return pageIcon;
    }

    public void setPageIcon(String pageIcon) {
        this.pageIcon = pageIcon;
    }

    public boolean isShowNewText() {
        return showNewText;
    }

    public void setShowNewText(boolean showNewText) {
        this.showNewText = showNewText;
    }

    public String getSimImage() {
        return simImage;
    }

    public void setSimImage(String simImage) {
        this.simImage = simImage;
    }

    public String getImageText() {
        return imageText;
    }

    public void setImageText(String imageText) {
        this.imageText = imageText;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }
}
