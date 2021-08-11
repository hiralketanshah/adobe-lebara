package com.lebara.core.dto;

import com.lebara.core.models.Links;

import java.util.List;

public class PageLinks {
    private Links parentLinks;
    private List<String> childLinks;

    public Links getParentLinks() {
        return parentLinks;
    }

    public void setParentLinks(Links parentLinks) {
        this.parentLinks = parentLinks;
    }

    public List<String> getChildLinks() {
        return childLinks;
    }

    public void setChildLinks(List<String> childLinks) {
        this.childLinks = childLinks;
    }
}
