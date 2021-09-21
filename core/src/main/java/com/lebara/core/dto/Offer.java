package com.lebara.core.dto;

import com.google.gson.annotations.SerializedName;

import java.util.List;

public class Offer {
    public String offerId;
    public String name;
    public int validity;
    public int cost;
    public List<Allowance> allowances;

}
