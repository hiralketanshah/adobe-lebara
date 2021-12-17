package com.lebara.core.dto;

import com.lebara.core.models.beans.Link;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class PageLink {
    private Link parentLinks;
    private List<Link> childLinks;

    public Link getParentLinks() {
        return parentLinks;
    }

    public void setParentLinks(Link parentLinks) {
        this.parentLinks = parentLinks;
    }

    public List<Link> getChildLinks() {
        return childLinks == null ? Collections.emptyList() : Collections.unmodifiableList(childLinks);
    }

    public void setChildLinks(List<Link> childLinks) {
        this.childLinks = childLinks;
    }
}
