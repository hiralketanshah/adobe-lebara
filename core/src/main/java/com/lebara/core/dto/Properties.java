package com.lebara.core.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Properties {
    @JsonProperty("cq:model")
    private String cqModel;
    private String title;
    private String description;
    private Elements elements;

    public String getCqModel() {
        return cqModel;
    }

    public void setCqModel(String cqModel) {
        this.cqModel = cqModel;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Elements getElements() {
        return elements;
    }

    public void setElements(Elements elements) {
        this.elements = elements;
    }
}
