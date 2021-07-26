package com.lebara.core.dto;

import com.google.gson.annotations.SerializedName;

public class Allowance {
    private int allowanceValue;
    private Account account;

    @SerializedName("__typename")
    private String typeName;

    public int getAllowanceValue() {
        return allowanceValue;
    }

    public void setAllowanceValue(int allowanceValue) {
        this.allowanceValue = allowanceValue;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public String getTypeName() {
        return typeName;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }
}
