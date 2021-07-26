package com.lebara.core.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

class Unit {
    private String abbreviation;

    @JsonProperty("__typename")
    private String typename;

    public String getAbbreviation() {
        return abbreviation;
    }

    public void setAbbreviation(String abbreviation) {
        this.abbreviation = abbreviation;
    }

    public String getTypename() {
        return typename;
    }

    public void setTypename(String typename) {
        this.typename = typename;
    }
}
