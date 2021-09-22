package com.lebara.core.dto;

public class CFAllowance {
    String name;
    String value;
    String unit;
    String formatedValue;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getFormatedValue() {
        return formatedValue;
    }

    public void setFormatedValue(String formatedValue) {
        this.formatedValue = formatedValue;
    }
}
