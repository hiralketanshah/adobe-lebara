package com.lebara.core.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Channel {
    private String name;

    @JsonProperty("__typename")
    private String typename;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTypename() {
        return typename;
    }

    public void setTypename(String typename) {
        this.typename = typename;
    }
}
