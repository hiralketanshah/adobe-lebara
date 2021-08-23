package com.lebara.core.dto;

import com.google.gson.annotations.SerializedName;

public class Unit {
    private String abbreviation;

    @SerializedName("__typename")
    private String typeName;

    public String getAbbreviation() {
        return abbreviation;
    }

    public void setAbbreviation(String abbreviation) {
        this.abbreviation = abbreviation;
    }

    public String getTypeName() {
        return typeName;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }
}
