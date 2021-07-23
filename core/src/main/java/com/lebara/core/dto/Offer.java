package com.lebara.core.dto;

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
    public String __typename;
}
