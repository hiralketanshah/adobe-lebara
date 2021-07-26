package com.lebara.core.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Allowance {
    private int allowanceValue;
    private Account account;

    @JsonProperty("__typename")
    private String typename;

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

    public String getTypename() {
        return typename;
    }

    public void setTypename(String typename) {
        this.typename = typename;
    }
}
