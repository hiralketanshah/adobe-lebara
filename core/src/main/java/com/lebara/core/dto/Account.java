package com.lebara.core.dto;

import com.google.gson.annotations.SerializedName;

public class Account {
    private String name;
    private Unit unit;

    @SerializedName("__typename")
    private String typeName;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Unit getUnit() {
        return unit;
    }

    public void setUnit(Unit unit) {
        this.unit = unit;
    }

    public String getTypeName() {
        return typeName;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }
}