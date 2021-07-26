package com.lebara.core.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class Offer {
    public String offerId;
    public String type;
    public String billingType;
    public String name;
    public String reportingName;
    public boolean isActive;
    public String validityType;
    public int validity;
    public int cost;
    public List<Channel> channels;
    public List<Allowance> allowances;

    @JsonProperty("__typename")
    public String typeName;
}
