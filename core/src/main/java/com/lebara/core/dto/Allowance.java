package com.lebara.core.dto;

public class Allowance {
    private int allowanceValue;
    private Account account;
    private String __typename;

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

    public String get__typename() {
        return __typename;
    }

    public void set__typename(String __typename) {
        this.__typename = __typename;
    }
}
