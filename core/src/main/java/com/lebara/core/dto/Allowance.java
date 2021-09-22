package com.lebara.core.dto;

public class Allowance {
    private String allowanceValue;
    private Account account;

    public String getAllowanceValue() {
        return allowanceValue;
    }

    public void setAllowanceValue(String allowanceValue) {
        this.allowanceValue = allowanceValue;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

}
