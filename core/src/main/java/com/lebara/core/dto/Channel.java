package com.lebara.core.dto;

import com.google.gson.annotations.SerializedName;

public class Channel {
    private String name;

    @SerializedName("__typename")
    private String typeName;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTypeName() {
        return typeName;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }
}