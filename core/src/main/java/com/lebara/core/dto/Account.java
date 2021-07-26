package com.lebara.core.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Account {
    private String name;
    private Unit unit;

    @JsonProperty("__typename")
    private String typename;

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

    public String getTypename() {
        return typename;
    }

    public void setTypename(String typename) {
        this.typename = typename;
    }
}
