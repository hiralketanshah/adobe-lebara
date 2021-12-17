package com.lebara.core.dto;

import java.util.List;

public class Offer {
    private String offerId;
    private String name;
    private int validity;
    private int cost;
    private List<Allowance> allowances;

    public String getOfferId() {
        return offerId;
    }

    public String getName() {
        return name;
    }

    public int getValidity() {
        return validity;
    }

    public int getCost() {
        return cost;
    }
    public List<Allowance> getAllowances() {
        return allowances;
    }
}
