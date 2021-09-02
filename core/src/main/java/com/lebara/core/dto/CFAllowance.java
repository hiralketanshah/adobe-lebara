package com.lebara.core.dto;

import org.apache.commons.lang3.StringUtils;

public class CFAllowance {
    String name;
    int value;
    String unit;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getFormatedValue() {
        String value = StringUtils.EMPTY;
        if (StringUtils.isNotBlank(this.unit)) {
            switch (this.unit) {
                case "MB":
                    value = this.value >= 1024 ? (this.value / 1024) + "GB" : this.value + "MB";
                    break;
                case "sms":
                    value = this.value + " SMS";
                    break;
                case "mins":
                    value = this.value + " Minutes";
                    break;
            }
        }
        return value;
    }
}
