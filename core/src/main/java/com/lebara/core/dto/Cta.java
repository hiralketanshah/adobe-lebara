package com.lebara.core.dto;

public class Cta {
    private String label;
    private String link;

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public Cta(String label, String link) {
        this.label = label;
        this.link = link;
    }
}
